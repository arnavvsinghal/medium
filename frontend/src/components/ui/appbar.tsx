import { FunctionComponent } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Button } from "./button";
import AvatarImg from "./avatar";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import userAtom from "@/store/atom/user";
import { Heading } from "./heading";
import { Skeleton } from "./skeleton";
import axios from "axios";

interface AppBarProps {
  variant: "blog" | "post" | "edit";
  blogId?: string;
}

const AppBar: FunctionComponent<AppBarProps> = ({ variant, blogId }) => {
  const navigate = useNavigate();
  const userData = useRecoilValueLoadable(userAtom);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      navigate(0);
    } catch (e: any) {
      console.log(e);
    }
  };
  return (
    <div>
      <div className="flex h-16 px-8 justify-between items-center bg-bgmain ">
        <Link to={"/blogs"}>
          <Heading className="text-4xl">Bitwise</Heading>
        </Link>
        <div className="flex">
          {variant == "post" ? null : variant == "blog" ? (
            <Button
              onClick={() => {
                navigate("/post");
              }}
              className={"mr-4"}
              variant={"outline"}
            >
              Publish
            </Button>
          ) : (
            <div>
              <Button
                onClick={handleDelete}
                className={"mr-4"}
                variant={"outline"}
              >
                Delete
              </Button>
              <Button
                onClick={() => {
                  navigate(`/post?id=${blogId}`);
                }}
                className={"mr-4"}
                variant={"outline"}
              >
                Edit
              </Button>
            </div>
          )}
          <HoverCard>
            <HoverCardTrigger>
              <div className="h-10 w-10">
                {userData.state == "loading" ? (
                  <Skeleton className="h-full w-full rounded-full" />
                ) : (
                  <AvatarImg shape="circle" id={userData.contents.id} />
                )}
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-textmain border-textmain">
              <Button onClick={handleLogout} size={"sm"} variant={"secondary"}>
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
