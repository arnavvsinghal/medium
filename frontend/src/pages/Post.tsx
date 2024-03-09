import { FunctionComponent } from "react";
import AppBar from "@/components/ui/appbar";
import AvatarImg from "@/components/ui/avatar";
import { userAtom } from "@/store/atoms/user";
import { useRecoilValueLoadable } from "recoil";
import { Skeleton } from "@/components/ui/skeleton";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface PostProps {}

const Post: FunctionComponent<PostProps> = () => {
  const userData = useRecoilValueLoadable(userAtom);
  return (
    <div className="flex flex-col items-center bg-bgmain min-h-screen">
      <AppBar variant="post" />
      <div className="h-40 w-40 mt-4 mb-2">
        {userData.state == "loading" ? (
          <Skeleton className="h-full w-full rounded-full" />
        ) : (
          <AvatarImg shape="circle" email={userData.contents.email} />
        )}
      </div>
      {userData.state == "loading" ? (
        <Skeleton className="h-12 w-40" />
      ) : (
        <Heading className="text-5xl">{userData.contents.name}</Heading>
      )}
      <AvatarImg email={userData.contents.email} shape="circle" />
      <Textarea
        className="bg-tertiary border-0 placeholder:text-textsecondary w-3/4 h-1/2 my-2 text-textsecondary"
        placeholder="Title"
      />
      <Textarea
        className="bg-tertiary border-0 placeholder:text-textsecondary w-3/4 flex-grow my-2 text-textsecondary"
        placeholder="Title"
      />
      <Button className="mt-2 mb-4" variant={"ghost"}>
        Submit
      </Button>
    </div>
  );
};

export default Post;
