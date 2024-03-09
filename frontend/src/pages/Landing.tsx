import { FunctionComponent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import axios from "axios";
import { BACKEND_URL } from "@/config";
interface LandingProps {}

const Landing: FunctionComponent<LandingProps> = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const useEffectAsync = async () => {
      if (localStorage.token) {
        try {
          await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          });
          navigate("/blogs")
        } catch (err) {
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    };
    useEffectAsync();
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-bgmain p-4">
        <BackgroundBeams />
        <Heading className="text-6xl sm:text-7xl">
          Bitwise
        </Heading>
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
