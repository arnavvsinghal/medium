import { BackgroundBeams } from "@/components/ui/background-beams";
import SignUpForm from "@/components/ui/signup-form";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useNavigate } from "react-router-dom";
import { FunctionComponent, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
interface SignUpProps {}
const SignUp: FunctionComponent<SignUpProps> = () => {
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
          text: "Write to be read."
        }
      ];
  return (
    <div className="h-screen flex justify-evenly items-center bg-bgmain px-4">
      <BackgroundBeams/>
      <div className="w-1/2 hidden md:block">
        <TypewriterEffectSmooth words={words} />
      </div>
      <div className="bg-main z-20">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
