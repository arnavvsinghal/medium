import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Post from "./pages/Post";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path={"/"} element={<Landing />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/signin"} element={<SignIn />} />
        <Route path={"/blogs"} element={<Blogs />} />
        <Route path={"/blog/*"} element={<Blog />} />
        <Route path={"/post"} element={<Post />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
