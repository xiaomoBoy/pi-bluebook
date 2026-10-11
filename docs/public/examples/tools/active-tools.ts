import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerCommand("bluebook-tools", {
    description: "显示直接提供给模型的工具名称",
    handler: async (_args, ctx) => {
      ctx.ui.notify(pi.getActiveTools().sort().join(", "), "info");
    },
  });
}
