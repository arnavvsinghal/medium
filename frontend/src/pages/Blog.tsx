import { FunctionComponent, useState } from "react";
import BlogCard from "@/components/ui/blogcard";
import AppBar from "@/components/ui/appbar";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { blogAtomFamily } from "@/store/selectorFamily/blog";
import { userAtom } from "@/store/atoms/user";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LabelInputContainer } from "@/components/ui/label-input-container";
import { Loader2 } from "lucide-react";
import { BACKEND_URL } from "@/config";
interface CardProps {
  id: string;
  author: {
    id: string;
    name: string;
  };
  date: string;
  title: string;
  content: string;
}
interface BlogProps {}

const Blog: FunctionComponent<BlogProps> = () => {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [post, setPost] = useRecoilStateLoadable(blogAtomFamily(search));

  const user = useRecoilValue(userAtom);

  const handleClick = () => {
    // setLoading((loading)r => !loading);
    // setPost(useRecoilValue(blogAtomFamily(search)));
    console.log(search);
  };
  const words = [
    {
      text: `Welcome ${user.name}!`,
    },
  ];
  return (
    <div className="bg-bgmain">
      <AppBar />
      <TypewriterEffectSmooth words={words} />
      <div className="flex items-center justify-center mx-auto">
        <LabelInputContainer className="w-4/5">
          <Input
            id="email"
            placeholder="Search for your favourite Blogs."
            type="email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </LabelInputContainer>
        {loading ? (
          <Button className={"mr-0"} size={"lg"} variant={"ghost"}>
            <Loader2 className="h-10 py-2 mx-3 animate-spin" />
          </Button>
        ) : (
          <Button
            onClick={handleClick}
            className={"mr-0"}
            size={"lg"}
            variant={"ghost"}
          >
            Search
          </Button>
        )}
      </div>
      <div className="flex flex-col items-center">
        {post.state == "loading"
          ? null
          : post.contents.data.blogs.map((blog: CardProps) => (
              <div className="w-4/5">
                <BlogCard
                  key={blog.id}
                  id={blog.author.id}
                  name={blog.author.name}
                  date={blog.date}
                  title={blog.title}
                  content={blog.content}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Blog;
