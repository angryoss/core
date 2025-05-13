import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const waitlistRouter = createTRPCRouter({
  join: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.waitlistEntry.findUnique({
        where: { email: input.email },
      });

      if (existing) {
        return { alreadyJoined: true };
      }

      await ctx.db.waitlistEntry.create({
        data: { email: input.email },
      });

      return { success: true };
    }),
});
