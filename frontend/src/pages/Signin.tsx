import SignInForm from "@/components/ui/signin-form";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import useCheckSignIn from "@/hooks/useCheckSignIn";

const SignIn = () => {
  useCheckSignIn();
  const words = [
    {
      text: "Eat. Sleep. Blog. Repeat.",
    },
  ];
  return (
    <div className="h-screen flex justify-evenly items-center bg-bgmain px-4">
      <div className="w-1/2 hidden md:block">
        <TypewriterEffectSmooth words={words} />
      </div>
      <div className="bg-main z-10">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
