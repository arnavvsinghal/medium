import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// blogRouter.use(async (c, next) => {
//   const jwt = c.req.header("Authorization");
//   if (!jwt) {
//     c.status(401);
//     return c.json({ Error: "Unauthorized" });
//   }
//   const token = jwt.split(" ")[1];
//   const payload = await verify(token, c.env.JWT_SECRET);
//   if (!payload) {
//     c.status(401);
//     return c.json({ error: "unauthorized" });
//   }
//   c.set("userId", payload.id);
//   await next();
// });

blogRouter.get("/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text("get blog route");
});

blogRouter.post("/", async (c) => {
    // const userId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    // const body = await c.req.json();
    // const post = await prisma.post.create({
    //   data: {
    //     title: body.title,
    //     content: body.content,
    //     authorId: userId,
    //   },
    // });
    return c.json({
    //   id: post.id,
    });
});

blogRouter.put("/", (c) => {
  return c.text("blog put");
});

export default blogRouter;
