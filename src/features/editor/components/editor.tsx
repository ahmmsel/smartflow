"use client";

import { ErrorView, LoadingView } from "@/components/entity-component";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  useSuspenseWorkflow,
  useUpdateWorkflowName,
} from "@/features/workflows/hooks/use-workflows";
import { se } from "date-fns/locale";
import { SaveIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const EditorLoading = () => {
  return <LoadingView message="Loading Editor..." />;
};

export const EditorError = () => {
  return <ErrorView message="Error loading Editor." />;
};

export const EditorHeader = ({ workflowId }: { workflowId: string }) => {
  const workflow = useSuspenseWorkflow(workflowId);
  const updateWorkflowName = useUpdateWorkflowName();

  const [workflowNameIsEditing, setWorkflowNameIsEditing] = useState(false);
  const [workflowName, setWorkflowName] = useState(workflow.data.name);

  const workflowInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (workflow.data.name) {
      setWorkflowName(workflow.data.name);
    }
  }, [workflow.data.name]);

  useEffect(() => {
    if (workflowNameIsEditing && workflowInputRef.current) {
      workflowInputRef.current.focus();
      workflowInputRef.current.select();
    }
  }, [workflowNameIsEditing]);

  const handleSave = async () => {
    if (workflowName === workflow.data.name) {
      setWorkflowNameIsEditing(false);
      return;
    }

    try {
      await updateWorkflowName.mutateAsync({
        id: workflowId,
        name: workflowName,
      });
      setWorkflowNameIsEditing(false);
    } catch {
      setWorkflowName(workflow.data.name);
    } finally {
      setWorkflowNameIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setWorkflowName(workflow.data.name);
      setWorkflowNameIsEditing(false);
    }
  };

  return (
    <header className="flex items-center shrink-0 h-14 gap-2 border-b px-4 bg-background">
      <SidebarTrigger />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/workflows" prefetch>
                Workflows
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {!workflowNameIsEditing && (
            <BreadcrumbItem
              onClick={() => setWorkflowNameIsEditing(true)}
              className="hover:text-foreground transition-colors"
            >
              {workflow.data.name}
            </BreadcrumbItem>
          )}
          {!!workflowNameIsEditing && (
            <Input
              ref={workflowInputRef}
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className="h-7 w-auto min-w-25 px-2"
              disabled={updateWorkflowName.isPending}
            />
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto">
        <Button size="sm" onClick={() => {}} disabled>
          <SaveIcon />
          Save
        </Button>
      </div>
    </header>
  );
};

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const workflow = useSuspenseWorkflow(workflowId);

  return <div>{/* Add more editor components and logic here */}</div>;
};
