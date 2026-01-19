import prisma from "@/lib/db";
import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { z } from "zod";

export const workflowsRouter = createTRPCRouter({
  create: premiumProcedure.mutation(({ ctx }) => {
    return prisma.workflow.create({
      data: {
        name: "New Workflow",
        userId: ctx.auth.user.id,
      },
    });
  }),
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input: { id } }) => {
      return prisma.workflow.delete({
        where: {
          id: id,
          userId: ctx.auth.user.id,
        },
      });
    }),
  updateName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(({ ctx, input: { id, name } }) => {
      return prisma.workflow.update({
        where: {
          id: id,
          userId: ctx.auth.user.id,
        },
        data: {
          name: name,
        },
      });
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input: { id } }) => {
      return prisma.workflow.findUnique({
        where: {
          id: id,
          userId: ctx.auth.user.id,
        },
      });
    }),
  getMany: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany({
      where: {
        userId: ctx.auth.user.id,
      },
    });
  }),
});
