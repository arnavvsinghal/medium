import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import useCheckSignIn from "@/hooks/useCheckSignIn";
import { motion, useIsPresent } from "framer-motion";
const Landing = () => {
  useCheckSignIn();
  const isPresent = useIsPresent();
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-bgmain p-4">
        <Heading className="text-6xl sm:text-7xl">Bitwise</Heading>
        <p className="text-neutral-500 max-w-xl my-2 text-sm text-center sm:text-lg z-10">
          Left shift your knowledge, right shift your distractions.
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
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{
            scaleX: 0,
            transition: { duration: 0.75, ease: "circOut" },
          }}
          exit={{ scaleX: 1, transition: { duration: 0.75, ease: "circIn" } }}
          style={{ originX: isPresent ? 0 : 1 }}
          className="fixed top-0 left-0 right-0 bottom-0 bg-accent z-50"
        />
      </div>
    </>
  );
};

export default Landing;
