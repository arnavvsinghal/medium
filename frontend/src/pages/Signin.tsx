import SignInForm from "@/components/ui/signin-form";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FunctionComponent, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useNavigate } from "react-router-dom";
interface SignInProps {}
const SignIn: FunctionComponent<SignInProps> = () => {
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
  const words = [
    {
      text: "Eat. Sleep. Blog. Repeat.",
    },
  ];
  return (
    <div className="h-screen flex justify-evenly items-center bg-bgmain px-4">
      <BackgroundBeams />
      <div className="w-1/2 hidden md:block">
        <TypewriterEffectSmooth words={words} />
      </div>
      <div className="bg-main z-20">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
