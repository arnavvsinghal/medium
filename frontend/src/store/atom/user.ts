import axios from "axios";
import { atom, selector } from "recoil";

export const userAtom = atom({
  key: "userAtom",
  default: selector({
    key: "userAtom/Default",
    get: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/info`,
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
export default userAtom;
