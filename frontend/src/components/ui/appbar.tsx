import { FunctionComponent } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Button } from "./button";
import AvatarImg from "./avatar";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/store/atoms/user";
import { Heading } from "./heading";

interface AppBarProps {}

const AppBar: FunctionComponent<AppBarProps> = () => {
  const navigate = useNavigate();
  const { email } = useRecoilValue(userAtom);
  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <div className="flex h-16 px-8 justify-between items-center bg-bgmain ">
        <Heading className="text-4xl">
          Bitwise
        </Heading>
        <HoverCard>
          <HoverCardTrigger>
            <div className="h-10 w-10">
              <AvatarImg shape = "circle" email={email} />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="bg-textmain border-textmain">
            <Button onClick={handleClick} size={"sm"} variant={"secondary"}>
              Log Out
            </Button>
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="h-[0.5px] w-screen bg-quaternary"></div>
    </div>
  );
};

export default AppBar;
