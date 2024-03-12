import AppBar from "@/components/ui/appbar";
import AvatarImg from "@/components/ui/avatar";
import { Heading } from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";
import userAtom from "@/store/atom/user";
import specificBlogSelector from "@/store/selectorFamily/specificBlogSelector";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";

const Blog = () => {
  const userData = useRecoilValueLoadable(userAtom);
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const blog = useRecoilValueLoadable(specificBlogSelector(id));
  const blogExists: Boolean =
    blog.state === "hasValue" && blog.contents.length ? true : false;
  useEffect(() => {
    if (
      blog.state === "hasError" ||
      (blog.state === "hasValue" && blog.contents.length == 0) ||
      userData.state === "hasError"
    ) {
      navigate("/blogs");
    }
  }, [blog, navigate]);
  return (
    <div className="flex flex-col items-center bg-bgmain min-h-screen">
      <AppBar
        variant={
          userData.state == "hasValue" &&
          blogExists &&
          userData.contents.id == blog.contents[0].author.id
            ? "edit"
            : "post"
        }
        blogId={blogExists ? blog.contents[0].id : null}
      />
      {blog.state == "loading" ? (
        <div className="flex flex-col items-center w-screen flex-grow">
          <Skeleton className="h-40 w-40 mt-4 mb-2 rounded-full" />
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-3/4 my-2" />
          <Skeleton className="h-1 flex-grow w-3/4 my-2" />
        </div>
      ) : (
        <div className="flex flex-col items-center w-3/4 mx-auto">
          <div className="h-40 w-40 mt-4 mb-2">
            <AvatarImg
              shape="circle"
              id={blogExists ? blog.contents[0].author.id : ""}
            />
          </div>
          <Heading className="text-5xl">
            {blogExists ? blog.contents[0].author.name : ""}
          </Heading>
          <div className="text-3xl text-textsecondary mt-4 mb-2">
            {blogExists ? blog.contents[0].title : ""}
          </div>
          <div className="text-lg text-textsecondary mt-4 mb-2">
            {blogExists ? blog.contents[0].content : ""}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
