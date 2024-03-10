import { useMemo } from "react";
export const usePagination = (currentPage: number, itemsPerPage: number) => {
  const indexCalculation = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return [indexOfFirstItem, indexOfLastItem];
  };
  const memoizedValue = useMemo(() => indexCalculation(), [currentPage]);
  return memoizedValue;
};
export default usePagination;
