import AppBar from "@/components/ui/appbar";
import { blogAtomFamily } from "@/store/selectorFamily/blog";
import { FunctionComponent } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
interface BlogProps {}
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
const Blog: FunctionComponent<BlogProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const allBlogs = useRecoilValue(blogAtomFamily(1)).blogs;
  const id = searchParams.get("id");
    let filter = allBlogs.filter((item:CardProps) => item.id === id);
  console.log(id);
  console.log(filter);
  return (
    <div>
      <AppBar variant="post" />
    </div>
  );
};

export default Blog;
