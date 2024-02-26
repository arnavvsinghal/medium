import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { hashFunction } from "./functions/hash";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.post("/api/v1/signup", async (c) => {
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

app.post("/api/v1/signin", async (c) => {
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
  if(!user){
    c.status(403);
    return c.json({error: "User doesn't exist."})
  }
  const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwtToken });
});

app.get("/api/v1/blog/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text("get blog route");
});

app.post("/api/v1/blog", (c) => {
  return c.text("signin route");
});

app.put("/api/v1/blog", (c) => {
  return c.text("signin route");
});

export default app;
