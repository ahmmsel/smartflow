import { inngest } from "@/inngest/client";
import { createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    console.log("Fetching workflows from the database...", ctx.auth.user.id);
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async ({ ctx }) => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: ctx.auth.user.email,
      },
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
