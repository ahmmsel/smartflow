"use client";

import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { StripeTriggerDialog } from "./dialog";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { fetchStripeTriggerToken } from "./action";

export const StripeTriggerNode = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenSettings = () => setOpen(true);

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: "stripe-trigger-executions",
    refreshToken: fetchStripeTriggerToken,
    topic: "status",
  });

  return (
    <>
      <StripeTriggerDialog open={open} onOpenChange={setOpen} />
      <BaseTriggerNode
        {...props}
        icon="/logos/stripe.svg"
        name="Stripe Trigger"
        description="When stripe event occurs"
        status={nodeStatus}
        onSettings={handleOpenSettings}
        // onDoubleClick={handleOpenSettings}
      />
    </>
  );
});
