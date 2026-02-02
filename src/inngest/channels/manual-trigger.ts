import { channel, topic } from "@inngest/realtime";

export const manualTriggerChannel = channel(
  "manual-trigger-executions",
).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>(),
);
