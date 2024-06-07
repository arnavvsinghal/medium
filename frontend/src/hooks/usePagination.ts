import { useMemo, useCallback } from "react";

export const usePagination = (currentPage: number, itemsPerPage: number) => {
  const indexCalculation = useCallback(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return [indexOfFirstItem, indexOfLastItem];
  }, [currentPage, itemsPerPage]);

  const memoizedValue = useMemo(indexCalculation, [
    currentPage,
    itemsPerPage,
    indexCalculation,
  ]);

  return memoizedValue;
};

export default usePagination;
