import { z } from "zod";
import { router, publicProcedure } from "./server";

// test router
export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name ?? "World"}!`,
      };
    }),

  getTime: publicProcedure.query(() => {
    return {
      time: new Date().toISOString(),
    };
  }),

  echo: publicProcedure
    .input(z.object({ message: z.string() }))
    .mutation(({ input }) => {
      return {
        message: input.message,
      };
    }),
});

export type AppRouter = typeof appRouter;
