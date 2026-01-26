"use client";

import { NodeToolbar, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { SettingsIcon, TrashIcon } from "lucide-react";

interface WorkflowNodeProps {
  children: React.ReactNode;
  showToolbar?: boolean;
  onDelete?: () => void;
  onSettings?: () => void;
  name?: string;
  description?: string;
}

export const WorkflowNode = ({
  children,
  showToolbar = true,
  onDelete,
  onSettings,
  name,
  description,
}: WorkflowNodeProps) => {
  return (
    <>
      {!!showToolbar && (
        <NodeToolbar>
          <Button onClick={onSettings} variant="ghost" size="sm">
            <SettingsIcon className="size-4" />
          </Button>
          <Button onClick={onDelete} variant="ghost" size="sm">
            <TrashIcon className="size-4" />
          </Button>
        </NodeToolbar>
      )}
      {children}
      {!!name && (
        <NodeToolbar
          position={Position.Bottom}
          className="max-w-50 text-center"
          isVisible
        >
          <p className="font-medium text-sm">{name}</p>
          {!!description && (
            <p className="text-xs text-muted-foreground truncate">
              {description}
            </p>
          )}
        </NodeToolbar>
      )}
    </>
  );
};
