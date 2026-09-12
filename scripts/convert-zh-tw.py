#!/usr/bin/env python3
"""將簡中 docs 轉換為繁中 docs/zh-TW/（追加版本，不動原文）。

管線：OpenCC s2twp -> zh-tw-glossary.json 覆蓋 -> 專有名詞首次並列 -> 內部連結改寫為 /zh-TW/。
保護：frontmatter link 欄、程式碼圍欄、行內程式碼、連結目標、URL 不做名詞替換。
"""
import json
import argparse
import re
import shutil
import sys
import tempfile
from pathlib import Path

import opencc

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
DST = DOCS / "zh-TW"
GLOSSARY_PATH = Path(__file__).resolve().parent / "zh-tw-glossary.json"

CONVERTER = opencc.OpenCC("s2twp")

with open(GLOSSARY_PATH, encoding="utf-8") as f:
    GLOSSARY = json.load(f)

POST_FIXES = GLOSSARY.get("post_opencc_fixes", {})
TERMS = GLOSSARY.get("prose_terms_first_occurrence", {})

# 內部文件前綴（需加 /zh-TW）
DOC_PREFIXES = ("guide/", "cases/", "reference/", "plugins/", "journey/", "translations/", "tweets/")

# term 正則：依字串長度由長到短，避免 Prompt Caching 被 Caching 先吃掉等
TERM_ORDER = sorted(TERMS.keys(), key=len, reverse=True)

FENCED_RE = re.compile(r"(```.*?```)", re.DOTALL)
INLINE_RE = re.compile(r"(`[^`\n]+`)")
# 連結目標 stash：](url) 與 href="url" / src="url"
LINK_URL_RE = re.compile(r"\]\(([^)\s]+)(\s+\"[^\"]*\")?\)")
HREF_RE = re.compile(r"(href|src)=\"([^\"]+)\"")
NAV_TEXT_RE = re.compile(r"(text:\s*)'([^'\n]*)'")
NAV_LINK_RE = re.compile(r"(link:\s*)'([^'\n]*)'")
NAV_SECTION_RE = re.compile(r"^(\s*)'(/[^'\n]+/)':", re.MULTILINE)


def normalize_eof(text: str) -> str:
    """生成檔案統一保留一個行尾換行，避免同步產生空白 EOF 差異。"""
    return text.rstrip() + "\n"


def rewrite_url(url: str) -> str:
    if not url.startswith("/"):
        return url
    base, hash_sep, fragment = url.partition("#")
    if base == "/":
        new_base = "/zh-TW/"
    else:
        path = base[1:]
        new_base = base
        for prefix in DOC_PREFIXES:
            if path == prefix.rstrip("/") or path.startswith(prefix):
                new_base = "/zh-TW/" + path
                break
        if path.startswith("examples/"):
            new_base = "/examples-tw/" + path[len("examples/"):]
    if hash_sep:
        return new_base + hash_sep + convert_fragment(fragment)
    return new_base


def rewrite_frontmatter_link(line: str) -> str:
    m = re.match(r"^(\s*link:\s*)(\S+)(\s*)$", line)
    if not m:
        return line
    return f"{m.group(1)}{rewrite_url(m.group(2))}{m.group(3)}"


def apply_post_fixes(text: str) -> str:
    # 簡中原文中為英文術語保留的空格，在術語轉成中文後不應殘留。
    # 先去空格，再套用詞組修正，才能處理「模型 Provider」一類替換後的重複詞。
    text = re.sub(
        r"(?<=[\u3400-\u9fff）】」』])[ \t]+(?=[\u3400-\u9fff（【「『])",
        "",
        text,
    )
    # 收斂迴圈：等長鍵之間有鏈式關係（如 賬號→帳號→使用者帳戶），
    # 單次遍歷的先後順序會漏改；迭代至不變為止（有上限，避免震盪）。
    for _ in range(10):
        new_text = text
        for k in sorted(POST_FIXES.keys(), key=len, reverse=True):
            new_text = new_text.replace(k, POST_FIXES[k])
        # 正則收尾（避免字典取代造成重複後綴）
        new_text = re.sub(r"終端(?!機)", "終端機", new_text)
        new_text = re.sub(r"外掛(?!程式)", "外掛程式", new_text)
        if new_text == text:
            return new_text
        text = new_text
    return text


def make_term_pattern(term: str) -> re.Pattern:
    # 詞界：排除連字號/斜線/英數字相鄰（如 pi-cc-extensions 不應命中 Extension）
    pre, post = r"(?<![\w/-])", r"(?![\w/-])"
    if term == "Harness":
        # 單獨 Harness（非 Agent Harness 一部分）共用 Agent Harness 計數器
        return re.compile(r"(?<!agent )" + pre + r"Harness" + post, re.IGNORECASE)
    if " " in term:
        return re.compile(pre + re.escape(term) + post, re.IGNORECASE)
    if term in ("Session", "Context", "Skill", "Extension", "Package", "Subagent", "Provider"):
        return re.compile(pre + re.escape(term) + r"s?" + post, re.IGNORECASE)
    return re.compile(pre + re.escape(term) + post, re.IGNORECASE)


TERM_PATTERNS = {t: make_term_pattern(t) for t in TERM_ORDER}

# 「子/主 Agent」複合詞（Apent 前有中文字子/主/多，或連字號 sub-agent）
SUB_AGENT_RE = re.compile(r"子\s?[Aa]gent(?![\w/-])")
MAIN_AGENT_RE = re.compile(r"主\s?[Aa]gent(?![\w/-])")
MULTI_AGENT_RE = re.compile(r"多\s?[Aa]gent(?![\w/-])")
SUB_AGENT_HYPHEN_RE = re.compile(r"(?<![\w/-])[Ss]ub[-\s][Aa]gents?(?![\w/-])")

# Harness 單獨出現時共用計數器鍵
TERM_COUNTER_KEY = {"Harness": "Agent Harness"}


def apply_compound_agents(text: str, counters: dict, with_first_occurrence: bool) -> str:
    def guarded(repl_fn):
        def _w(m):
            if m.start() > 0 and text[m.start() - 1] in ("（", "("):
                return m.group(0)
            return repl_fn(m)
        return _w

    def sub_repl(m):
        if not with_first_occurrence:
            return "子代理"
        n = counters.get("Subagent", 0)
        counters["Subagent"] = n + 1
        return "子代理（Subagent）" if n == 0 else "子代理"

    def main_repl(m):
        if not with_first_occurrence:
            return "主代理"
        n = counters.get("MainAgent", 0)
        counters["MainAgent"] = n + 1
        return "主代理（Main Agent）" if n == 0 else "主代理"

    def sub_hyphen_repl(m):
        if not with_first_occurrence:
            return "子代理"
        n = counters.get("Subagent", 0)
        counters["Subagent"] = n + 1
        return "子代理（Subagent）" if n == 0 else "子代理"

    text = SUB_AGENT_RE.sub(guarded(sub_repl), text)
    text = SUB_AGENT_HYPHEN_RE.sub(guarded(sub_hyphen_repl), text)
    text = MAIN_AGENT_RE.sub(guarded(main_repl), text)
    text = MULTI_AGENT_RE.sub("多代理", text)
    return text


def convert_prose_segment(text: str, counters: dict, with_first_occurrence: bool) -> str:
    text = CONVERTER.convert(text)
    text = apply_post_fixes(text)
    text = apply_compound_agents(text, counters, with_first_occurrence)
    for term in TERM_ORDER:
        pat = TERM_PATTERNS[term]
        first = TERMS[term]["first"]
        rest = TERMS[term]["rest"]
        ckey = TERM_COUNTER_KEY.get(term, term)

        def _repl(m, _ckey=ckey, _first=first, _rest=rest):
            # 已是並列形式內的英文（如 代理框架（Agent Harness））不重複處理
            start = m.start()
            if start > 0 and text[start - 1] in ("（", "("):
                return m.group(0)
            if not with_first_occurrence:
                return _rest
            n = counters.get(_ckey, 0)
            counters[_ckey] = n + 1
            return _first if n == 0 else _rest

        text = pat.sub(_repl, text)
    return apply_post_fixes(text)


def convert_code_segment(text: str) -> str:
    """保留命令與第三方 URL；本站下載材料必須與繁體驗收文字一致。"""
    converted = apply_post_fixes(CONVERTER.convert(text))
    return converted.replace(
        "https://pi.xiaomovps.com/examples/", "https://pi.xiaomovps.com/examples-tw/"
    )


def convert_fragment(fragment: str) -> str:
    """同頁錨點：OpenCC + 修正 + 純中文（rest 形式），以對齊標題 slug。"""
    counters: dict = {}
    text = CONVERTER.convert(fragment)
    text = apply_post_fixes(text)
    text = SUB_AGENT_RE.sub("子代理", text)
    text = SUB_AGENT_HYPHEN_RE.sub("子代理", text)
    text = MAIN_AGENT_RE.sub("主代理", text)
    text = MULTI_AGENT_RE.sub("多代理", text)
    for term in TERM_ORDER:
        text = TERM_PATTERNS[term].sub(TERMS[term]["rest"], text)
    _ = counters
    return apply_post_fixes(text)


def convert_text_with_protection(body: str, counters: dict, with_first_occurrence: bool) -> str:
    """保護連結目標與 href 後，對 prose 做轉換；程式碼圍欄/行內碼原樣保留。"""
    url_slots: list[str] = []

    def stash_url(url: str) -> str:
        url_slots.append(url)
        return f"__URLSLOT{len(url_slots) - 1}__"

    def unstash_url(text: str) -> str:
        for i, url in enumerate(url_slots):
            if url.startswith("#") and len(url) > 1:
                text = text.replace(f"__URLSLOT{i}__", convert_fragment(url))
            else:
                text = text.replace(f"__URLSLOT{i}__", rewrite_url(url))
        return text

    body = LINK_URL_RE.sub(lambda m: "](" + stash_url(m.group(1)) + (m.group(2) or "") + ")", body)
    body = HREF_RE.sub(lambda m: f'{m.group(1)}="{stash_url(m.group(2))}"', body)

    parts = FENCED_RE.split(body)
    out: list[str] = []
    for i, part in enumerate(parts):
        if i % 2 == 1:
            out.append(convert_code_segment(part))  # fenced code 轉換中文、保留命令
            continue
        subparts = INLINE_RE.split(part)
        for j, sp in enumerate(subparts):
            if j % 2 == 1:
                out.append(convert_code_segment(sp))  # inline code 同上
            else:
                out.append(convert_prose_segment(sp, counters, with_first_occurrence))
    return unstash_url("".join(out))


def convert_frontmatter(fm: str) -> str:
    lines = fm.split("\n")
    out: list[str] = []
    for line in lines:
        # 單行式：prev: { text: XXX, link: /yyy } / next: {...}
        m_inline = re.match(r"^(\s*(?:prev|next):\s*\{\s*text:\s*)(.*?)(\s*,\s*link:\s*)(\S+)(\s*\}\s*)$", line)
        if m_inline:
            counters: dict = {}
            new_text = convert_prose_segment(m_inline.group(2), counters, with_first_occurrence=False)
            out.append(
                f"{m_inline.group(1)}{new_text}{m_inline.group(3)}"
                f"{rewrite_url(m_inline.group(4))}{m_inline.group(5)}"
            )
            continue
        if re.match(r"^\s*link:\s*/", line):
            out.append(rewrite_frontmatter_link(line))
            continue
        m = re.match(r"^(\s*(titleTemplate|title|description|text):\s*)(.+)$", line)
        if m:
            prefix, key, value = m.group(1), m.group(2), m.group(3)
            counters: dict = {}
            # 標題與描述用純中文（rest 形式），避免 sidebar 過長
            converted = convert_prose_segment(value, counters, with_first_occurrence=False)
            out.append(prefix + converted)
        else:
            out.append(line)
    return "\n".join(out)


TRANSLATION_NOTE = (
    "::: info 繁體轉換版說明\n"
    "本頁為簡中授權譯文之繁體轉換版。英文原文版權歸 Earendil 所有，"
    "中文譯文及轉換部分按 CC BY 4.0 發布。如有歧義，請以英文原文為準。\n"
    ":::"
)


def convert_file(src: Path, dst: Path) -> None:
    raw = src.read_text(encoding="utf-8")
    fm, sep, body = raw.partition("---\n")
    if sep == "" or not raw.startswith("---"):
        # 無 frontmatter，直接轉內文
        counters: dict = {}
        converted = convert_text_with_protection(raw, counters, True)
        dst.parent.mkdir(parents=True, exist_ok=True)
        dst.write_text(normalize_eof(converted), encoding="utf-8")
        return
    # raw 以 --- 開頭：切出 frontmatter（第二個 --- 行之前）
    rest = raw[len("---\n"):]
    end = rest.find("\n---\n")
    if end == -1:
        end = rest.find("\n---")
    if end == -1:
        raise ValueError(f"frontmatter 未閉合：{src}")
    fm_text = rest[:end]
    body = rest[end + len("\n---"):]
    if body.startswith("\n"):
        body = body[1:]

    new_fm = convert_frontmatter(fm_text)
    counters = {}
    new_body = convert_text_with_protection(body, counters, True)

    # 授權譯文加註（僅 translations/，index 除外由通用流程處理標題即可）
    rel = src.relative_to(DOCS).as_posix()
    if rel.startswith("translations/") and rel != "translations/index.md":
        # 插在第一個 H1 之後
        new_body, n = re.subn(r"(^# .+\n)", r"\1\n" + TRANSLATION_NOTE + "\n", new_body, count=1, flags=re.MULTILINE)
        if n == 0:
            new_body = TRANSLATION_NOTE + "\n\n" + new_body

    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(normalize_eof("---\n" + new_fm + "\n---\n" + new_body), encoding="utf-8")


def convert_navigation(output_docs: Path) -> None:
    """從簡中站點地圖產生同結構的繁中導航，避免兩份選單各自漂移。"""
    src = DOCS / ".vitepress" / "config" / "navigation.mts"
    dst = output_docs / ".vitepress" / "config" / "navigation.zh-tw.mts"
    dst.parent.mkdir(parents=True, exist_ok=True)
    raw = src.read_text(encoding="utf-8")

    raw = raw.replace("export const nav =", "export const navTW =", 1)
    raw = raw.replace("export const sidebar =", "export const sidebarTW =", 1)
    raw = raw.replace(
        "/** Global navigation shown in the top bar. */",
        "/** Traditional Chinese navigation generated by scripts/convert-zh-tw.py. */",
    )
    raw = raw.replace(
        "/** Section-specific sidebars. Keep learning order here, not in the main config. */",
        "/** Traditional Chinese sidebars generated from navigation.mts. */",
    )

    def convert_label(match: re.Match) -> str:
        converted = convert_prose_segment(match.group(2), {}, with_first_occurrence=False)
        return f"{match.group(1)}'{converted}'"

    def convert_link(match: re.Match) -> str:
        return f"{match.group(1)}'{rewrite_url(match.group(2))}'"

    def convert_section(match: re.Match) -> str:
        return f"{match.group(1)}'{rewrite_url(match.group(2))}':"

    raw = NAV_TEXT_RE.sub(convert_label, raw)
    raw = NAV_LINK_RE.sub(convert_link, raw)
    raw = NAV_SECTION_RE.sub(convert_section, raw)
    dst.write_text(normalize_eof(raw), encoding="utf-8")
    print("  導航 navigation.mts -> navigation.zh-tw.mts")


def generate(output_docs: Path) -> None:
    # 內容頁：排除 public 與 zh-TW 本身
    sources = sorted(
        p
        for p in DOCS.rglob("*.md")
        if "public/" not in p.as_posix()
        and "zh-TW/" not in p.as_posix()
        and ".vitepress/dist/" not in p.as_posix()
    )
    print(f"來源 {len(sources)} 篇")
    for src in sources:
        dst = output_docs / "zh-TW" / src.relative_to(DOCS)
        convert_file(src, dst)
        print(f"  {src.relative_to(DOCS)} -> {dst.relative_to(output_docs)}")

    convert_navigation(output_docs)

    # 範例檔：docs/public/examples -> docs/public/examples-tw（.md 轉換，其餘原樣複製）
    src_ex = DOCS / "public" / "examples"
    dst_ex = output_docs / "public" / "examples-tw"
    if dst_ex.exists():
        shutil.rmtree(dst_ex)
    shutil.copytree(src_ex, dst_ex)
    for p in sorted(dst_ex.rglob("*.md")):
        raw = p.read_text(encoding="utf-8")
        counters: dict = {}
        p.write_text(normalize_eof(convert_text_with_protection(raw, counters, True)), encoding="utf-8")
        print(f"  範例 {p.relative_to(output_docs)}")
    for p in sorted(dst_ex.rglob("*.ts")):
        raw = p.read_text(encoding="utf-8")
        p.write_text(normalize_eof(convert_code_segment(raw)), encoding="utf-8")
        print(f"  範例程式 {p.relative_to(output_docs)}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="只核對生成內容，不修改工作區")
    args = parser.parse_args()
    if args.check:
        with tempfile.TemporaryDirectory(prefix="pi-bluebook-locales-") as directory:
            expected = Path(directory)
            generate(expected)
            errors = []
            for generated in expected.rglob("*"):
                if not generated.is_file():
                    continue
                relative = generated.relative_to(expected)
                actual = DOCS / relative
                if not actual.exists() or actual.read_bytes() != generated.read_bytes():
                    errors.append(str(relative))
            for tree in ["zh-TW", "public/examples-tw"]:
                for actual in (DOCS / tree).rglob("*"):
                    if actual.is_file() and not (expected / actual.relative_to(DOCS)).exists():
                        errors.append(f"orphan: {actual.relative_to(DOCS)}")
            if errors:
                print("繁體生成內容不一致，請執行 npm run sync:zh-tw：", file=sys.stderr)
                print("\n".join(errors), file=sys.stderr)
                return 1
            print("Translation check passed: generated content matches source and glossary")
            return 0
    generate(DOCS)

    print("完成")
    return 0


if __name__ == "__main__":
    sys.exit(main())
