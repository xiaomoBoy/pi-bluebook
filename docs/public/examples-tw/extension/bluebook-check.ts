import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerCommand("bluebook-check", {
    description: "確認教學 Extension 已成功載入",
    handler: async (_args, ctx) => {
      ctx.ui.notify(
        "藍皮書 Extension 已載入；本命令沒有讀取或修改檔案。",
        "info",
      );
    },
  });
}
