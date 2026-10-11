import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerCommand("bluebook-tools", {
    description: "顯示直接提供給模型的工具名稱",
    handler: async (_args, ctx) => {
      ctx.ui.notify(pi.getActiveTools().sort().join(", "), "info");
    },
  });
}
