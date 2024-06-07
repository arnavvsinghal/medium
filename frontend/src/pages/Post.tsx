import { useEffect, useState } from "react";
import AppBar from "@/components/ui/appbar";
import AvatarImg from "@/components/ui/avatar";
import userAtom from "@/store/atom/user";
import { useRecoilValueLoadable } from "recoil";
import { Skeleton } from "@/components/ui/skeleton";
import { Heading } from "@/components/ui/heading";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CreatePostType } from "@arnavitis/medium-common";
import { Loader2 } from "lucide-react";
import { Toaster, toast } from "sonner";
import useCheckSignOut from "@/hooks/useCheckSignOut";
import { useSearchParams } from "react-router-dom";
import specificBlogSelector from "@/store/selectorFamily/specificBlogSelector";
import { motion, useIsPresent } from "framer-motion";
const Post = () => {
  const navigate = useCheckSignOut();
  const userData = useRecoilValueLoadable(userAtom);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const blog = useRecoilValueLoadable(specificBlogSelector(id));
  const blogExists: boolean =
    blog.state === "hasValue" && blog.contents.length ? true : false;
  useEffect(() => {
    if (
      blog.state === "hasError" ||
      (blog.state === "hasValue" && blog.contents.length === 0 && id) ||
      userData.state === "hasError" ||
      (userData.state === "hasValue" &&
        blogExists &&
        userData.contents.id !== blog.contents[0].author.id)
    ) {
      navigate("/blogs");
    }
  }, [navigate, blog, id, userData, blogExists]);
  const [loading, setLoading] = useState<boolean>(false);
  const [postData, setPostData] = useState<CreatePostType>({
    title: blogExists ? blog.contents[0].title : "",
    content: blogExists ? blog.contents[0].content : "",
  });
  const isPresent = useIsPresent();
  const handleClick = async () => {
    setLoading(true);
    try {
      const response = blogExists
        ? await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`,
            {
              ...postData,
              id: blog.contents[0].id,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          )
        : await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`,
            postData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );
      setLoading(false);
      navigate(`/blog?id=${response.data.id}`);
      if (blogExists) {
        navigate(0);
      }
    } catch (e: any) {
      toast.error(e.response.data.error || "Error While Posting!", {
        position: "top-center",
      });
      setLoading(false);
    }
  };
  if (userData.state === "hasError") {
    return <div className="bg-bgmain h-screen"></div>;
  }

  return (
    <div className="flex flex-col items-center bg-bgmain min-h-screen">
      <Toaster richColors />
      <AppBar variant="post" />
      <div className="h-40 w-40 mt-4 mb-2  z-10">
        {userData.state === "loading" ? (
          <Skeleton className="h-full w-full rounded-full" />
        ) : (
          <AvatarImg shape="circle" id={userData.contents.id} />
        )}
      </div>
      {userData.state === "loading" ? (
        <Skeleton className="h-12 w-40" />
      ) : (
        <Heading className="text-5xl z-10">{userData.contents.name}</Heading>
      )}

      <Textarea
        disabled={loading ? true : undefined}
        className="bg-tertiary placeholder:text-textsecondary w-3/4 my-2 text-textsecondary text-lg z-10"
        placeholder="Title"
        value={postData.title}
        onChange={(e) =>
          setPostData((postData) => ({
            ...postData,
            title: e.target.value,
          }))
        }
      />
      <Textarea
        disabled={loading ? true : undefined}
        className="bg-tertiary placeholder:text-textsecondary w-3/4 flex-grow my-2 text-textsecondary z-10"
        placeholder="Content"
        value={postData.content}
        onChange={(e) =>
          setPostData((postData) => ({
            ...postData,
            content: e.target.value,
          }))
        }
      />
      {loading ? (
        <Button disabled className="mt-2 mb-4" variant={"ghost"}>
          <Loader2 className="h-10 py-2 mr-2 animate-spin" />
          Please wait
        </Button>
      ) : (
        <div>
          <Button
            onClick={() => {
              navigate("/blogs");
            }}
            className="mt-2 mb-4 mx-1"
            variant={"ghost"}
          >
            Cancel
          </Button>
          <Button
            onClick={handleClick}
            className="mt-2 mb-4 mx-1"
            variant={"ghost"}
          >
            Submit
          </Button>
        </div>
      )}
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

export default Post;
