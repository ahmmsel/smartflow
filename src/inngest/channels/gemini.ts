import { channel, topic } from "@inngest/realtime";

export const geminiChannel = channel("gemini-executions").addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>(),
);
