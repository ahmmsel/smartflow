import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";

export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(({ ctx }) => {
    console.log("Fetching users from the database...", ctx.auth.user.id);
    return prisma.user.findMany({
      where: { id: ctx.auth.user.id },
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
