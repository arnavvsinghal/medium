import { FunctionComponent } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Button } from "./button";
import AvatarImg from "./avatar";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { userAtom } from "@/store/atoms/user";
import { Heading } from "./heading";
import { Skeleton } from "./skeleton";

interface AppBarProps {
  variant: "blog" | "post";
}

const AppBar: FunctionComponent<AppBarProps> = ({ variant }) => {
  const navigate = useNavigate();
  const userData = useRecoilValueLoadable(userAtom);
  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <div className="flex h-16 px-8 justify-between items-center bg-bgmain ">
        <Heading className="text-4xl">Bitwise</Heading>
        <div className="flex">
          {variant == "post" ? null : (
            <Button onClick={() => {
              navigate("/post")
            }} className={"mr-4"} variant={"outline"}>
              Publish
            </Button>
          )}
          <HoverCard>
            <HoverCardTrigger>
              <div className="h-10 w-10">
                {userData.state == "loading" ? (
                  <Skeleton className="h-full w-full rounded-full" />
                ) : (
                  <AvatarImg shape="circle" email={userData.contents.email} />
                )}
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-textmain border-textmain">
              <Button onClick={handleClick} size={"sm"} variant={"secondary"}>
                Log Out
              </Button>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      <div className="h-[0.5px] w-screen bg-quaternary"></div>
    </div>
  );
};

export default AppBar;
