import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path={"/"} element={<Landing />} />
      <Route path={"/signup"} element={<SignUp />} />
      <Route path={"/signin"} element={<SignIn />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
