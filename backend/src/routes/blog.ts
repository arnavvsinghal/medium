import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const bookRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

bookRouter.get("/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text("get blog route");
});

bookRouter.post("/", (c) => {
  console.log("Blog route");
  return c.text("blog post");
});

bookRouter.put("/", (c) => {
  return c.text("blog put");
});

export default bookRouter;
