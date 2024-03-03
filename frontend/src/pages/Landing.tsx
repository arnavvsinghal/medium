import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";

interface LandingProps {}

const Landing: FunctionComponent<LandingProps> = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-bgmain p-4">
        <BackgroundBeams />
        <h1 className="z-10 text-6xl sm:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-textmain to-tertiary font-bold text-center">
          Bitwise
        </h1>
        <p className="text-neutral-500 max-w-xl my-2 text-sm text-center sm:text-lg z-10">
          Left shift your knowledge, right
          shift your distractions.
        </p>
        <div className="mt-4">
          <Link to={"/signup"}>
            <Button className={"mx-4"} size={"lg"} variant={"secondary"}>
              Sign Up
            </Button>
          </Link>
          <Link to={"/signin"}>
            <Button className={"mx-4"} size={"lg"} variant={"ghost"}>
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Landing;
