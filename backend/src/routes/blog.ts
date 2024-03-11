import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { blogContext } from "../context";

import {
  jwtAuth,
  blogCreateValidation,
  blogUpdateValidation,
} from "../middlewares/blogMiddlewares";

const blogRouter = new Hono<blogContext>();

blogRouter.use(jwtAuth);

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      date: true,
      author: {
        select: {
          name: true,
          id: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });
  return c.json({
    blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) {
    return c.json({ error: "Blog doesn't exist." });
  }
  return c.json(post);
});

blogRouter.post("/", blogCreateValidation, async (c) => {
  const userId = c.get("jwtPayload").id;
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = c.get("body");

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
      date: new Date(),
    },
  });
  return c.json({
    id: post.id,
  });
});

blogRouter.put("/", blogUpdateValidation, async (c) => {
  const userId = c.get("jwtPayload").id;
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = c.get("body");

  const post = await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({
    id: post.id,
  });
});
blogRouter.delete("/:id", async (c) => {
  const userId = c.get("jwtPayload").id;
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // const body = c.get("body");
  const id = c.req.param("id");

  const post = await prisma.post.delete({
    where: {
      id,
      authorId: userId,
    },
  });
  return c.json({
    id: post.id,
  });
});
export default blogRouter;
