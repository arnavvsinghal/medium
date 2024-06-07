import { selectorFamily } from "recoil";
import blogAtom from "../types/blogAtom";
import blogAtomFamily from "../atomFamily/blogFamily";

export const specificBlogSelector = selectorFamily({
  key: "specificBlogSelector",
  get:
    (filter: string) =>
    ({ get }) => {
      const blogData = get(blogAtomFamily(filter));
      const filteredData = blogData.blogs.filter(
        (item: blogAtom) => item.id === filter,
      );
      return filteredData;
    },
});
export default specificBlogSelector;
