import type { MiddlewareHandler } from "hono";
import { jwt } from "hono/jwt";
import { createPostInput, updatePostInput } from "@arnavitis/medium-common";

export const jwtAuth: MiddlewareHandler = async (c, next) => {
  const jwtMiddleware = jwt({
    secret: c.env.JWT_SECRET,
  });
  return jwtMiddleware(c, next);
};

export const blogCreateValidation: MiddlewareHandler = async (c, next) => {
  const body = await c.req.json();
  const res = createPostInput.safeParse(body);
  if (!res.success) {
    c.status(400);
    return c.json({ error: res.error.issues[0].message });
  }
  c.set("body", body);
  await next();
};

export const blogUpdateValidation: MiddlewareHandler = async (c, next) => {
  const body = await c.req.json();
  const res = updatePostInput.safeParse(body);
  if (!res.success) {
    c.status(400);
    return c.json({ error: res.error.issues[0].message });
  }
  c.set("body", body);
  await next();
};
