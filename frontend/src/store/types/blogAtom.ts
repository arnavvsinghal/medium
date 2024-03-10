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
export default blogAtom;
