import { selectorFamily } from "recoil";
import blogAtom from "../types/blogAtom";
import blogAtomFamily from "../atomFamily/blogFamily";

export const userBlogSelector = selectorFamily({
    key: "userBlogSelector",
    get:
      (filter: string) =>
      ({ get }) => {
        const blogData = get(blogAtomFamily(filter));
        const filteredData = blogData.contents.blogs.filter(
          (item: blogAtom) => item.author.id === filter
        );
        return filteredData;
      },
  });