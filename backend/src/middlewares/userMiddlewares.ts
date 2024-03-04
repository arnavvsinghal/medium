import type { MiddlewareHandler } from "hono";
import { signinInput, signupInput } from "@arnavitis/medium-common";

export const userSignupValidation: MiddlewareHandler = async (c, next) => {
  const body = await c.req.json();
  const res = signupInput.safeParse(body);
  if (!res.success) {
    c.status(400);
    return c.json({ error: res.error.issues[0].message });
  }
  c.set("body", body);
  await next();
};

export const userSigninValidation: MiddlewareHandler = async (c, next) => {
  const body = await c.req.json();
  const res = signinInput.safeParse(body);
  if (!res.success) {
    c.status(400);
    return c.json({ error: res.error.issues[0].message });
  }
  c.set("body", body);
  await next();
};
