import axios from "axios";
import { atomFamily, selectorFamily } from "recoil";

export const blogAtomFamily = atomFamily({
  key: "BlogAtom",
  default: selectorFamily({
    key: "BlogAtom/Default",
    get: (_) => async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    },
  }),
});
export default blogAtomFamily;
