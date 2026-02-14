"use client";

import { NodeType } from "@/generated/prisma/enums";
import { GlobeIcon, MousePointer2Icon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { toast } from "sonner";
import { createId } from "@paralleldrive/cuid2";

export type NodeTypeOption = {
  type: NodeType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }> | string;
};

const triggerNodes: NodeTypeOption[] = [
  {
    type: NodeType.MANUAL_TRIGGER,
    label: "Manual Trigger",
    description: "Start the workflow manually",
    icon: MousePointer2Icon,
  },
  {
    type: NodeType.GOOGLE_FORM_TRIGGER,
    label: "Google Form Trigger",
    description: "Trigger the workflow on form submission",
    icon: "/logos/googleform.svg",
  },
  {
    type: NodeType.STRIPE_TRIGGER,
    label: "Stripe Trigger",
    description: "When stripe event occurs",
    icon: "/logos/stripe.svg",
  },
];

const executionNodes: NodeTypeOption[] = [
  {
    type: NodeType.HTTP_REQUEST,
    label: "HTTP Request",
    description: "Make an HTTP request to an external API",
    icon: GlobeIcon,
  },
];

interface NodeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const NodeSelector = ({
  open,
  onOpenChange,
  children,
}: NodeSelectorProps) => {
  const { setNodes, getNodes, screenToFlowPosition } = useReactFlow();

  const handleNodeSelect = useCallback(
    (selection: NodeTypeOption) => {
      if (selection.type === NodeType.MANUAL_TRIGGER) {
        const nodes = getNodes();
        const hasManualTrigger = nodes.some(
          (node) => node.type === NodeType.MANUAL_TRIGGER,
        );

        console.log("nodes:", nodes);

        if (hasManualTrigger) {
          console.log("should throw error");
          toast.error("A Manual Trigger node already exists in the workflow.");
          return;
        }
      }

      setNodes((nodes) => {
        const hasInitialNode = nodes.some(
          (node) => node.type === NodeType.INITIAL,
        );

        console.log("hasInitialNode:", hasInitialNode);

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const flowPosition = screenToFlowPosition({
          x: centerX + (Math.random() - 0.5) * 200,
          y: centerY + (Math.random() - 0.5) * 200,
        });

        const newNode = {
          id: createId(),
          data: {},
          position: flowPosition,
          type: selection.type,
        };

        if (hasInitialNode) {
          return [newNode];
        }

        return [...nodes, newNode];
      });

      onOpenChange(false);
    },
    [setNodes, getNodes, screenToFlowPosition, onOpenChange],
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Node Selector</SheetTitle>
          <SheetDescription>
            Select a node type to add to your workflow.
          </SheetDescription>
        </SheetHeader>
        <div>
          {triggerNodes.map((nodeType) => {
            const Icon = nodeType.icon;
            return (
              <div
                key={nodeType.type}
                className="w-full justify-start h-auto p-5 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
                onClick={() => handleNodeSelect(nodeType)}
              >
                <div className="flex items-center w-full gap-6 overflow-hidden">
                  {typeof Icon === "string" ? (
                    <img
                      src={Icon}
                      alt={nodeType.label}
                      className="size-6 shrink-0"
                    />
                  ) : (
                    <Icon className="size-6 shrink-0" />
                  )}
                  <div className="flex flex-col items-start text-start overflow-hidden">
                    <p className="font-medium leading-tight truncate">
                      {nodeType.label}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {nodeType.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Separator />
        <div>
          {executionNodes.map((nodeType) => {
            const Icon = nodeType.icon;
            return (
              <div
                key={nodeType.type}
                className="w-full justify-start h-auto p-5 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
                onClick={() => handleNodeSelect(nodeType)}
              >
                <div className="flex items-center w-full gap-6 overflow-hidden">
                  {typeof Icon === "string" ? (
                    <img
                      src={Icon}
                      alt={nodeType.label}
                      className="size-6 shrink-0"
                    />
                  ) : (
                    <Icon className="size-6 shrink-0" />
                  )}
                  <div className="flex flex-col items-start text-start overflow-hidden">
                    <p className="font-medium leading-tight truncate">
                      {nodeType.label}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {nodeType.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};
