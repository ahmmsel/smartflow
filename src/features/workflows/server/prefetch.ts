import { prefetch, trpc } from "@/trpc/server";
import type { inferInput } from "@trpc/tanstack-react-query";

type Input = inferInput<typeof trpc.workflows.getMany>;

export function prefetchWorkflows(params: Input) {
  prefetch(trpc.workflows.getMany.queryOptions(params));
}

export function prefetchWorkflow(id: string) {
  prefetch(trpc.workflows.getOne.queryOptions({ id }));
}
