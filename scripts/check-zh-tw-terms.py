#!/usr/bin/env python3
"""繁中生成物名詞回歸檢查：確保已淘汰的簡中/非標準用字不再出現。

用法：python3 scripts/check-zh-tw-terms.py
掃描 docs/zh-TW/ 與 docs/public/examples-tw/ 的 Markdown，
命中任一違禁形即列出檔案與行號並以 exit 1 失敗。
新增轉換規則（scripts/zh-tw-glossary.json）使某詞合法化時，
同步從 BANNED 移除；刻意保留的用字（倉庫、查詢、幫助、開源、
主題、迴圈等）不在此表。
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TARGETS = [ROOT / "docs" / "zh-TW", ROOT / "docs" / "public" / "examples-tw"]

# 違禁形 -> 應有形（訊息用）
BANNED = {
    "回車": "輸入鍵",
    "新建": "新增",
    "列表": "清單",
    "教程": "教學",
    "反饋": "回饋",
    "禁用": "停用",
    "賬": "帳",
    "帳號": "使用者帳戶",
    "套餐": "方案",
    "運營商": "電信業者/服務商",
    "命令列": "命令行",
    "信任": "信賴",
    "來源檔案": "原始檔案",
    "終端機體驗套件": "終端機體驗包",
    "云端": "雲端",
    "合作伙伴": "合作夥伴",
    "全域性": "全域",
    "後臺": "後台",
    "配置": "設定",
    "里面": "裡面",
    "插件": "外掛程式",
    "網絡": "網路",
    "域名": "網域",
    "許可權": "權限",
    "平臺": "平台",
    "實操": "實作",
    "沖突": "衝突",
    "圈複雜度": "迴路複雜性",
    "推文件案": "推文檔案",
    "質量": "品質",
    "服務器": "伺服器",
    "鼠標": "滑鼠",
    "軟件": "軟體",
    "數據": "資料",
    "硬盘": "硬碟",
    "內存": "記憶體",
    "打印機": "印表機",
    "光標": "游標",
    "默認": "預設",
    "視頻": "影片",
}

PATTERN = re.compile("|".join(sorted(BANNED.keys(), key=len, reverse=True)))


def main() -> int:
    errors: list[str] = []
    files = 0
    for base in TARGETS:
        if not base.exists():
            continue
        for path in sorted(base.rglob("*.md")):
            files += 1
            for no, line in enumerate(
                path.read_text(encoding="utf-8").splitlines(), start=1
            ):
                for m in PATTERN.finditer(line):
                    word = m.group(0)
                    errors.append(
                        f"{path.relative_to(ROOT)}:{no}: 出現「{word}」"
                        f"（應為「{BANNED[word]}」）"
                    )
    if errors:
        print(f"繁中名詞回歸檢查失敗：{len(errors)} 處違禁形（共掃描 {files} 篇）：")
        print("\n".join(errors))
        print("請在 scripts/zh-tw-glossary.json 加規則後重跑 npm run sync:zh-tw。")
        return 1
    print(f"繁中名詞回歸檢查通過：{files} 篇，{len(BANNED)} 組違禁形皆零命中。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
