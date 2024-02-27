import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { hashFunction } from "../functions/hash";
import { sign, verify } from "hono/jwt";
import Bindings from "../bindings";

const userRouter = new Hono<{
  Bindings: Bindings;
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const hashedPass = await hashFunction(body.password);
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPass,
        name: body.name,
      },
    });
    const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwtToken });
  } catch (e) {
    c.status(403);
    return c.json({ error: "Error while signing up." });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const hashedPass = await hashFunction(body.password);
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: hashedPass,
    },
  });
  if (!user) {
    c.status(403);
    return c.json({ error: "User doesn't exist." });
  }
  const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwtToken });
});


userRouter.get("/",async (c)=>{
    const user = await c.req.json();
    return c.text("yo");
})
export default userRouter;
