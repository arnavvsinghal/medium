import { z } from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be 8 or more characters long" }),
  name: z.string().min(3, { message: "Name must be 3 or more characters long" }),
});
export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be 8 or more characters long" }),
});
export type SigninType = z.infer<typeof signinInput>;

export const createPostInput = z.object({
  title: z.string().min(3, {message : "Title must be 3 or more characters long"}),
  content: z.string().min(5, {message : "Content must be 5 or more characters long"}),
});
export type CreatePostType = z.infer<typeof createPostInput>;

export const updatePostInput =  z.object({
  id: z.string(),
  title: z.string().min(3, {message : "Title must be 3 or more characters long"}),
  content: z.string().min(5, {message : "Content must be 5 or more characters long"}),
});
export type UpdatePostType = z.infer<typeof updatePostInput>;
