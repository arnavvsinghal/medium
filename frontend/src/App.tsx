import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Landing />} />
          <Route path={"/signup"} element={<SignUp />} />
          <Route path={"/signin"} element={<SignIn />} />
          <Route path={"/blog"} element={<Blog />} />
          <Route path={"/post"} element={<Post />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
