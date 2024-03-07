import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";
import { BACKEND_URL } from "@/config";

export const blogAtomFamily = atomFamily({
    key: 'BlogAtom',
    default: selectorFamily({
      key: 'BlogAtom/Default',
      get: filter => async () => {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk/`,{
          params : {
            filter : filter
          }
        });
        return res;
      },
    }),
  });

//   export const filteredBlogSelector = selectorFamily({
//     key: 'FilteredBlogSelector',
//     get: filter => ({ get }) => {
//         const blogData = get(blogAtomFamily(filter));
//         const filteredData = blogData.filter(item => item.key === filter.value); 
//         return filteredData;
//     },
// });