import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerCommand("bluebook-check", {
    description: "确认教学 Extension 已成功加载",
    handler: async (_args, ctx) => {
      ctx.ui.notify(
        "蓝皮书 Extension 已加载；本命令没有读取或修改文件。",
        "info",
      );
    },
  });
}
