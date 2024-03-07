import { BACKEND_URL } from "@/config";
import axios from "axios";
import { atom, selector } from "recoil";

export const userAtom = atom({
  key: "userAtom",
  default: selector({
    key: "userAtom/Default",
    get: async () => {
        const res = await axios.get(`${BACKEND_URL}/api/v1/user/info`,{
          headers :{
            Authorization : `Bearer ${localStorage.getItem("token")}`
          } 
        });
        return res.data;
    },
  }),
});
