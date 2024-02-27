import { z } from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
  name: z.string().min(3, { message: "Must be 3 or more characters long" }),
});
export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
});
export type SigninType = z.infer<typeof signinInput>;

export const createPostInput = z.object({
  title: z.string(),
  content: z.string(),
});
export type CreatePostType = z.infer<typeof createPostInput>;

export const updatePostInput = z.union([
  z.object({
    id: z.string(),
    title: z.string(),
    content: z.string().optional(),
  }),
  z.object({
    id: z.string(),
    title: z.string().optional(),
    content: z.string(),
  }),
]);
export type UpdatePostType = z.infer<typeof updatePostInput>;
