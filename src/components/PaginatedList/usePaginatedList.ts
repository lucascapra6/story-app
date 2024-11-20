import {useEffect, useState} from 'react';
// @ts-ignore
import {Page} from '@types/Pages';
import {useInfiniteQuery} from '@tanstack/react-query';

interface UsePaginatedListResult<TData> {
  list: TData[];
  isError: boolean | null;
  isLoading: boolean;
  refresh: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}
export function usePaginatedList<Data>(
  queryKey: readonly unknown[],
  getListService: (page: number) => Promise<Page<Data>>,
): UsePaginatedListResult<Data> {
  const [listData, setListData] = useState<Data[]>([]);

  const query = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({pageParam = 1}) => getListService(pageParam),
    getNextPageParam: ({meta}) =>
      meta.hasNextPage ? meta.currentPage + 1 : undefined,
  });

  useEffect(() => {
    if (query.data) {
      const pages = query.data.pages;
      const newPage = pages.reduce<Data[]>((prev, curr) => {
        return [...prev, ...curr.data];
      }, []);
      setListData(newPage);
    }
  }, [query.data]);

  return {
    list: listData,
    isError: query.isError,
    isLoading: query.isInitialLoading,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: !!query.hasNextPage,
    refresh: query.refetch,
  };
}
