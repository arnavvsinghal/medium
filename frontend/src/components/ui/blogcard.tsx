import { Link } from "react-router-dom";
import AvatarImg from "./avatar";
import { FunctionComponent } from "react";
interface BlogCardProps {
  id: string;
  name: string;
  date: string;
  title: string;
  content: string;
  authorId: string;
}

const BlogCard: FunctionComponent<BlogCardProps> = ({
  id,
  name,
  date,
  title,
  content,
  authorId,
}) => {
  const dateObj = new Date(date);
  date = dateObj.toDateString();
  return (
    <Link to={`/blog?id=${id}`}>
      <div className="flex items-center bg-textsecondary p-5 text-textdark rounded-xl my-1 transition ease-in-out hover:scale-105">
        <div className="flex-shrink-0 h-32 w-32">
          <AvatarImg shape="rounded" id={authorId} />
        </div>
        <div className="flex flex-col justify-between px-5">
          <div>
            <div className="flex items-center mb-2">
              <div className="pr-1 font-semibold text-lg">{name}</div>
              <div className="pr-1">&bull;</div>
              <div className="font-light">{date}</div>
            </div>
            <div className="text-2xl font-bold">{title.slice(0, 20)}</div>
            <div className="text-sm my-2 max-w-full sm:break-words sm:overflow-ellipsi">
              {content.slice(0, 110) + "..."}
            </div>
          </div>
          <div className="font-thin text-xs">{`${Math.ceil(
            content.length / 300
          )} minute(s) read`}</div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
