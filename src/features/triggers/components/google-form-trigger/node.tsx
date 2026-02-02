"use client";

import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointer2Icon } from "lucide-react";
import { GoogleFormTriggerDialog } from "./dialog";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { fetchGoogleFormTriggerToken } from "./action";

export const GoogleFormTriggerNode = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenSettings = () => setOpen(true);

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: "google-form-trigger-executions",
    refreshToken: fetchGoogleFormTriggerToken,
    topic: "status",
  });

  return (
    <>
      <GoogleFormTriggerDialog open={open} onOpenChange={setOpen} />
      <BaseTriggerNode
        {...props}
        icon="/logos/googleform.svg"
        name="Google Form Trigger"
        description="Trigger the workflow on form submission"
        status={nodeStatus}
        onSettings={handleOpenSettings}
        // onDoubleClick={handleOpenSettings}
      />
    </>
  );
});
