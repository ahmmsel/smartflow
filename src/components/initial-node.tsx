"use client";

import type { NodeProps } from "@xyflow/react";
import { memo } from "react";
import { PlaceholderNode } from "./placeholder-node";
import { PlusIcon } from "lucide-react";
import { WorkflowNode } from "./workflow-node";

export const InitialNode = memo((props: NodeProps) => {
  return (
    <WorkflowNode>
      <PlaceholderNode {...props}>
        <div className="flex items-center justify-center">
          <PlusIcon className="size-4" />
        </div>
      </PlaceholderNode>
    </WorkflowNode>
  );
});

InitialNode.displayName = "InitialNode";
