import { FunctionComponent } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Link } from "react-router-dom";

interface SignUpFormProps {}

const SignUpForm: FunctionComponent<SignUpFormProps> = () => {
  return (
    <div className="w-md w-full rounded-xl md:rounded-2xl p-4 md:p-8 shadow-input bg-textmain">
      <h2 className="font-bold text-center text-3xl text-textdark">Sign Up</h2>
      <p className="text-tertiary text-sm max-w-sm mt-2 text-center">
        Unlock the power of Bitwise and start crafting your digital legacy, one
        bit at a time!
      </p>
      <form className="mt-8">
        <LabelInputContainer className="mb-4">
          <Label className={"text-textdark"} htmlFor="email">
            Name
          </Label>
          <Input id="name" placeholder="Tyler Durden" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label className={"text-textdark"} htmlFor="email">
            Email Address
          </Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label className={"text-textdark"} htmlFor="password">
            Password
          </Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        <Button
          className="flex w-full bg-textdark border-textdark text-textsecondary transition ease-in-out hover:scale-105"
          variant={"default"}
        >
          Signup
        </Button>
      </form>
      <p className="my-4 text-tertiary text-sm max-w-sm text-center">
        {" "}
        Already have an account?{" "}
        <Link className="underline" to={"/"}>
          Sign In!
        </Link>
      </p>
    </div>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default SignUpForm;
