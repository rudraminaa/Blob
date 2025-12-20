import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "@blob/trpc/router";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type"],
    allowMethods: ["POST", "GET", "OPTIONS", "DELETE", "PUT"],
  }),
);

app.get("/", (c) => {
  return c.json({ message: "Hello from Hono + tRPC!" });
});

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  }),
);

export default app;
