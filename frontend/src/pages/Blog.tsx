import { FunctionComponent, useState } from "react";
import BlogCard from "@/components/ui/blogcard";
import AppBar from "@/components/ui/appbar";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  blogAtomFamily,
  searchBlogSelector,
  userBlogSelector,
} from "@/store/selectorFamily/blog";
import { userAtom } from "@/store/atoms/user";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LabelInputContainer } from "@/components/ui/label-input-container";
import { Loader2 } from "lucide-react";
import { BACKEND_URL } from "@/config";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Heading } from "@/components/ui/heading";

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
  const val = useRecoilValueLoadable(blogAtomFamily(1));
  const user = useRecoilValue(userAtom);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = val.contents.blogs.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handleClick = () => {
    setCurrentPage(1);
    setLoading((loading) => !loading);
    console.log(search);
  };
  return (
    <div className="flex flex-col justify-between bg-bgmain min-h-screen">
      <div className="flex-grow">
        <AppBar />
        <Heading className="text-5xl py-3">Welcome {user.name}!</Heading>
        <div className="flex items-center justify-center mx-auto mb-3">
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
          {val.state == "loading"
            ? null
            : currentItems.map((blog: CardProps) => (
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
      <div className="flex items-center justify-center my-3">
        <Button
          className={
            currentPage == 1 ? "pointer-events-none opacity-50 mx-2" : "mx-2"
          }
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
          variant="outline"
          size="icon"
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
        <Button
          className={
            currentPage == Math.ceil(val.contents.blogs.length / itemsPerPage)
              ? "pointer-events-none opacity-50 mx-2"
              : "mx-2"
          }
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
          variant="outline"
          size="icon"
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default Blog;
