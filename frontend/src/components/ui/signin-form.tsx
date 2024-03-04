import { ChangeEvent, FunctionComponent, useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Link, useNavigate } from "react-router-dom";
import { SigninType, signinInput } from "@arnavitis/medium-common";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { toast, Toaster } from "sonner";

interface SignInFormProps {}

const SignInForm: FunctionComponent<SignInFormProps> = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SigninType>({
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = signinInput.safeParse(formData);
    if (!res.success) {
      return toast.error(res.error.issues[0].message, {
        position: "top-center",
      });
    }
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        formData
      );
      localStorage.setItem("token", response.data.jwtToken);
      navigate("/");
      toast.success("Success!",{
        position : "top-center"
      })
    } catch (e) {
      toast.error("Error While Signing In!",{
        position : "top-center"
      })
    }
  };
  return (
    <div className="max-w-md w-full rounded-xl md:rounded-2xl p-4 md:p-8 shadow-input bg-textmain">
      <h2 className="text-center font-bold text-3xl text-textdark">Sign In</h2>
      <p className="text-tertiary text-sm max-w-sm mt-2 text-center">
        Welcome back! It's great to see you on Bitwise again.
      </p>

      <form className="mt-8" onSubmit={handleSubmit}>
        <Toaster richColors />
        <LabelInputContainer className="mb-4">
          <Label className={"text-textdark"} htmlFor="email">
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label className={"text-textdark"} htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <Button
          className="flex w-full bg-textdark border-textdark text-textsecondary transition ease-in-out hover:scale-105"
          variant={"default"}
        >
          Sign In
        </Button>
      </form>
      <p className="my-4 text-tertiary text-sm max-w-sm text-center">
        {" "}
        Dont have an account?{" "}
        <Link className="underline" to={"/"}>
          Sign Up!
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

export default SignInForm;
