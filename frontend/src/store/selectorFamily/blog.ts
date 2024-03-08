import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";
import { BACKEND_URL } from "@/config";

interface blogAtom {
  id: string;
  title: string;
  content: string;
  published: boolean;
  date: string;
  author: {
    name: string;
    id: string;
  };
}
export const blogAtomFamily = atomFamily({
  key: "BlogAtom",
  default: selectorFamily({
    key: "BlogAtom/Default",
    get: (_) => async () => {
      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`);
      return res.data;
    },
  }),
});

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

export const searchBlogSelector = selectorFamily({
  key: "searchBlogSelector",
  get:
    (filter: string) =>
    ({ get }) => {
      const blogData = get(blogAtomFamily(filter));
      console.log(blogData.blogs);
      const filteredData = blogData.blogs.filter(
        (item: blogAtom) =>
          item.title.includes(filter) || item.author.name.includes(filter)
      );
      return filteredData;
    },
});
