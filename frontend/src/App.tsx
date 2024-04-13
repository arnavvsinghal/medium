import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { BackgroundBeams } from "./components/ui/background-beams";
import AnimatedRoutes from "./AnimatedRoutes";

function App() {
  return (
    <>
      <BackgroundBeams />
      <RecoilRoot>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
