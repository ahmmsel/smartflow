"use client";

import { type NodeProps, Position } from "@xyflow/react";
import { LucideIcon } from "lucide-react";
import { memo } from "react";
import { WorkflowNode } from "@/components/workflow-node";
import { BaseNode, BaseNodeContent } from "@/components/base-node";
import Image from "next/image";
import { BaseHandle } from "@/components/base-handle";

interface BaseTriggerNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: React.ReactNode;
  // status?: NodeStatus
  onSettings?: () => void;
  onDoubleClick?: () => void;
}

export const BaseTriggerNode = memo(
  ({
    icon: Icon,
    name,
    description,
    children,
    onSettings,
    onDoubleClick,
  }: BaseTriggerNodeProps) => {
    // TODO: add delete handler
    const handleDelete = () => {};

    return (
      <WorkflowNode
        name={name}
        description={description}
        onSettings={onSettings}
        onDelete={handleDelete}
      >
        {/* TODO: wrap with node status */}
        <BaseNode
          onDoubleClick={onDoubleClick}
          className="rounded-l-2xl relative group"
        >
          <BaseNodeContent>
            {typeof Icon === "string" ? (
              <Image src={Icon} alt={name} width={16} height={16} />
            ) : (
              <Icon className="size-4 text-muted-foreground" />
            )}
            {children}
            <BaseHandle id="source-1" type="source" position={Position.Right} />
          </BaseNodeContent>
        </BaseNode>
      </WorkflowNode>
    );
  },
);

BaseTriggerNode.displayName = "BaseTriggerNode";
