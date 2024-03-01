import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { hashFunction } from "../functions/hash";
import { sign } from "hono/jwt";

import { userContext } from "../context";
import {
  userSignupValidation,
  userSigninValidation,
} from "../middlewares/userMiddlewares";

const userRouter = new Hono<userContext>();

userRouter.post("/signup", userSignupValidation, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = c.get("body");

  const hashedPass = await hashFunction(body.password);
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPass,
      },
    });
    const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwtToken });
  } catch (e) {
    c.status(403);
    return c.json({ error: "Error while signing up." });
  }
});

userRouter.post("/signin", userSigninValidation, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = c.get("body");

  const hashedPass = await hashFunction(body.password);
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    c.status(403);
    return c.json({ error: "User doesn't exist." });
  }
  if (user.password != hashedPass) {
    c.status(403);
    return c.json({ error: "Incorrect Password" });
  }
  const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwtToken });
});

export default userRouter;
