import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Post from "./pages/Post";
import { RecoilRoot } from "recoil";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path={"/"} element={<Landing />} />
          <Route path={"/signup"} element={<SignUp />} />
          <Route path={"/signin"} element={<SignIn />} />
          <Route path={"/blogs"} element={<Blogs />} />
          <Route path={"/blog/*"} element={<Blog />} />
          <Route path={"/post"} element={<Post />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
