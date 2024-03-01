import { Hono } from "hono";
import userRouter from "./routes/user";
import blogRouter from "./routes/blog";
import {Bindings} from "./context";

export const app = new Hono<{
  Bindings: Bindings;
}>();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
