import { selectorFamily } from "recoil";
import blogAtom from "../types/blogAtom";
import blogAtomFamily from "../atomFamily/blogFamily";

export const searchBlogSelector = selectorFamily({
  key: "searchBlogSelector",
  get:
    (filter: string) =>
    ({ get }) => {
      const blogData = get(blogAtomFamily(filter));
      const filteredData = blogData.blogs.filter(
        (item: blogAtom) =>
          item.title.toLowerCase().includes(filter.toLowerCase()) ||
          item.author.name.toLowerCase().includes(filter.toLowerCase()),
      );
      return filteredData;
    },
});
export default searchBlogSelector;
