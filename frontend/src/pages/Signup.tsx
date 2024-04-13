import SignUpForm from "@/components/ui/signup-form";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import useCheckSignIn from "@/hooks/useCheckSignIn";
import { motion, useIsPresent } from "framer-motion";
const SignUp = () => {
  useCheckSignIn();
  const words = [
    {
      text: "Write to be read.",
    },
  ];
  const isPresent = useIsPresent();
  return (
    <div className="bg-bgmain">
      <div className="h-screen flex justify-evenly items-center bg-bgmain px-4 max-w-[1280px] wx-full mx-auto">
        <div className="w-1/2 hidden md:block">
          <TypewriterEffectSmooth words={words} />
        </div>
        <div className="bg-main z-10">
          <SignUpForm />
        </div>
      </div>
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.75, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.75, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="fixed top-0 left-0 right-0 bottom-0 bg-accent z-50"
      />
    </div>
  );
};

export default SignUp;
