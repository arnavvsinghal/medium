import { FunctionComponent, useState } from "react";
import AppBar from "@/components/ui/appbar";
import AvatarImg from "@/components/ui/avatar";
import { userAtom } from "@/store/atoms/user";
import { useRecoilValueLoadable } from "recoil";
import { Skeleton } from "@/components/ui/skeleton";
import { Heading } from "@/components/ui/heading";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { CreatePostType } from "@arnavitis/medium-common";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
interface PostProps {}

const Post: FunctionComponent<PostProps> = () => {
  const userData = useRecoilValueLoadable(userAtom);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<Boolean>(false);
  let postData: CreatePostType = {
    title: "",
    content: "",
  };
  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);
      setLoading(false);
      navigate("/blog");
    } catch (e: any) {
      toast.error(e.response.data.error || "Error While Posting!", {
        position: "top-center",
      });
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center bg-bgmain min-h-screen">
      <AppBar variant="post" />
      <div className="h-40 w-40 mt-4 mb-2">
        {userData.state == "loading" ? (
          <Skeleton className="h-full w-full rounded-full" />
        ) : (
          <AvatarImg shape="circle" id={userData.contents.id} />
        )}
      </div>
      {userData.state == "loading" ? (
        <Skeleton className="h-12 w-40" />
      ) : (
        <Heading className="text-5xl">{userData.contents.name}</Heading>
      )}
      <AvatarImg id={userData.contents.id} shape="circle" />

      <Textarea
        disabled={loading ? true : undefined}
        className="bg-tertiary placeholder:text-textsecondary w-3/4 my-2 text-textsecondary text-lg"
        placeholder="Title"
        onChange={(e) => (postData.title = e.target.value)}
      />
      <Textarea
        disabled={loading ? true : undefined}
        className="bg-tertiary placeholder:text-textsecondary w-3/4 flex-grow my-2 text-textsecondary"
        placeholder="Content"
        onChange={(e) => (postData.content = e.target.value)}
      />
      {loading ? (
        <Button disabled className="mt-2 mb-4" variant={"ghost"}>
          <Loader2 className="h-10 py-2 mr-2 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button onClick={handleClick} className="mt-2 mb-4" variant={"ghost"}>
          Submit
        </Button>
      )}
    </div>
  );
};

export default Post;
