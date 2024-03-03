import SignInForm from "@/components/ui/signin-form";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

import { FunctionComponent } from "react";
interface SignInProps {}
const SignIn: FunctionComponent<SignInProps> = () => {
  const words = [
    {
      text: "Eat. Sleep. Blog. Repeat."
    }
  ];
  return (
    <div className="h-screen flex justify-evenly items-center bg-bgmain">
      <div className="w-1/2 hidden md:block">
        <TypewriterEffectSmooth words={words} />
      </div>
      <div className="bg-main">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
