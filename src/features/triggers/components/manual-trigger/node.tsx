"use client";

import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointer2Icon } from "lucide-react";
import { ManualTriggerDialog } from "./dialog";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { fetchManualTriggerToken } from "./action";

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenSettings = () => setOpen(true);

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: "manual-trigger-executions",
    refreshToken: fetchManualTriggerToken,
    topic: "status",
  });

  return (
    <>
      <ManualTriggerDialog open={open} onOpenChange={setOpen} />
      <BaseTriggerNode
        {...props}
        icon={MousePointer2Icon}
        name="Execuate on click!"
        status={nodeStatus}
        onSettings={handleOpenSettings}
        // onDoubleClick={handleOpenSettings}
      />
    </>
  );
});
