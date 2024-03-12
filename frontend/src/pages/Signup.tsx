import SignUpForm from "@/components/ui/signup-form";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import useCheckSignIn from "@/hooks/useCheckSignIn";

const SignUp = () => {
  useCheckSignIn();
  const words = [
    {
      text: "Write to be read.",
    },
  ];
  return (
    <div className="h-screen flex justify-evenly items-center bg-bgmain px-4">
      <div className="w-1/2 hidden md:block">
        <TypewriterEffectSmooth words={words} />
      </div>
      <div className="bg-main z-10">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
