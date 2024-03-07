import { atomFamily, selectorFamily } from "recoil";
import axios, { AxiosResponse } from "axios";
import { BACKEND_URL } from "@/config";
interface UserData {
  id: number;
  name: string;
  email: string;
}
export const blogAtomFamily = atomFamily({
  key: "BlogAtom",
  default: selectorFamily({
    key: "BlogAtom/Default",
    get: (_) => async () => {
      const res = await axios.get(
        `${BACKEND_URL}/api/v1/blog/bulk`
      );
      return res.data;
    },
  }),
});

export const userBlogSelector = selectorFamily({
  key: "userBlogSelector",
  get:
    (filter: number) => 
    ({ get }) => {
      const blogData = get(blogAtomFamily(filter));
      const filteredData = blogData.data.filter((item: UserData) => item.id === filter); 
      return filteredData;
    },
});