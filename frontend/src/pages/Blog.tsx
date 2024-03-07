import { FunctionComponent, useState } from "react";
import BlogCard from "@/components/ui/blogcard";
import AppBar from "@/components/ui/appbar";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { blogAtomFamily } from "@/store/selectorFamily/blog";
import { userAtom } from "@/store/atoms/user";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LabelInputContainer } from "@/components/ui/label-input-container";
import { Loader2 } from "lucide-react";
import { BACKEND_URL } from "@/config";
import { ChevronRight, ChevronLeft } from "lucide-react";
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
  const currentItems = val.contents.blogs.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log(val);
  const handleClick = () => {
    setLoading((loading) => !loading);

    console.log(search);
  };
  const words = [
    {
      text: `Welcome ${user.name}!`,
    },
  ];
  return (
    <div className="bg-bgmain h-screen">
      <AppBar />
      <TypewriterEffectSmooth words={words} />
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
      <div className="flex items-center">
        {currentPage > 1 && (
          <Button
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
            variant="outline"
            size="icon"
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
        )}

        {currentPage < Math.ceil(val.contents.blogs.length / itemsPerPage) && (
          <Button
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
            variant="outline"
            size="icon"
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Blog;
