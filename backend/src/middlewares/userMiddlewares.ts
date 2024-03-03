import type { MiddlewareHandler } from "hono";
import { signinInput,signupInput } from "@arnavitis/medium-common";

export const userSignupValidation: MiddlewareHandler = async (c, next) => {
  const body = await c.req.json();
  const {success} = signupInput.safeParse(body);
  if(!success){
    c.status(400);
    return c.json({ error: "Invalid Input" });
  }  
  c.set("body",body);
  await next();
};

export const userSigninValidation: MiddlewareHandler = async (c, next) => {
  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);
  if(!success){
    c.status(400);
    return c.json({ error: "Invalid Input" });
  }  
  c.set("body",body);
  await next();
};
