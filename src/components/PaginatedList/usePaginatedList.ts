import {useState} from 'react';
// @ts-ignore
import {Page} from '@types/Pages';

export function usePaginatedList<Data>(
  getListService: (page: number) => Promise<Page<Data>>,
) {
  const [listData, setListData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  async function fetchInitialData() {
    try {
      setError(null);
      setLoading(true);
      const {data, meta} = await getListService(1);
      setListData(data);
      if (meta.hasNextPage) {
        setPage(2);
        setHasNextPage(true);
      } else {
        setHasNextPage(false);
      }
    } catch (er) {
      console.log(er);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function fetchNextPage() {
    if (loading || !hasNextPage) {
      return;
    }
    try {
      setLoading(true);
      const {data, meta} = await getListService(page);
      setListData(prev => [...prev, ...data]);
      if (meta.hasNextPage) {
        setPage(prev => prev + 1);
      } else {
        setHasNextPage(false);
      }
    } catch (er) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  return {
    data: listData,
    error,
    loading,
    fetchInitialData,
    fetchNextPage,
    hasNextPage,
    refresh: fetchInitialData,
  };
}
