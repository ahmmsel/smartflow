"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function Page() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(trpc.createWorkflow.mutationOptions());

  return (
    <div>
      <Button onClick={() => create.mutate()} disabled={create.isPending}>
        Create Workflow
      </Button>
      {JSON.stringify(data)}
    </div>
  );
}
