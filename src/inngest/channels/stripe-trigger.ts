import { channel, topic } from "@inngest/realtime";

export const stripeTriggerChannel = channel(
  "stripe-trigger-executions",
).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>(),
);
