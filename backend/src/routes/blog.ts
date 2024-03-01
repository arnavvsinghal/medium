import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { jwt } from "hono/jwt";

import Bindings from "../bindings";
import { createPostInput,updatePostInput } from "@arnavitis/medium-common";

const blogRouter = new Hono<{
  Bindings: Bindings;
  Variables: {
    userId: string;
  };
}>();

blogRouter.use(
  (c, next) => {
    const jwtMiddleware = jwt({
      secret: c.env.JWT_SECRET,
    })
    return jwtMiddleware(c, next)
  }
)

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const post = await prisma.post.findUnique({where : {id}})
  if(!post){
    return c.json({error : "Blog doesn't exist."})
  }
  return c.json(post);
});

blogRouter.post("/", async (c) => {
  const userId = c.get("jwtPayload").id;
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const {success} = createPostInput.safeParse(body);
  if(!success){
    c.status(400);
    return c.json({ error: "Invalid Input" });
  }  
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  return c.json({
    id: post.id,
  });
});

blogRouter.put("/", async (c) => {
  const userId = c.get("jwtPayload").id;
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const {success} = updatePostInput.safeParse(body);
  if(!success){
    c.status(400);
    return c.json({ error: "Invalid Input" });
  }  
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

export default blogRouter;
