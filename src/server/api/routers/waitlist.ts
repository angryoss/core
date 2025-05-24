import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Waitlist tRPC Route
export const waitlistRouter = createTRPCRouter({
  join: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      // Check if email already exists in the waitlist
      const existing = await ctx.db.waitlistEntry.findUnique({
        where: { email: input.email },
      });

      // If email exists abort
      if (existing) {
        return { alreadyJoined: true };
      }

      // Otherwise add email to the waitlsit table as an entry
      await ctx.db.waitlistEntry.create({
        data: { email: input.email },
      });

      return { success: true };
    }),
});
