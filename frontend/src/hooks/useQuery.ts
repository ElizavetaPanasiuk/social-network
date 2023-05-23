import { useEffect, useState } from 'react';

type UseQueryOptions = {
  dependencies?: string[];
  pagination?: {
    enabled: boolean;
    ref: HTMLElement | null;
  };
};

function useQuery<T>(
  queryFn: (page?: number) => Promise<T> | Promise<{ data: T; isLast: boolean }>,
  { dependencies = [], pagination = { enabled: false, ref: null } }: UseQueryOptions = {},
) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | Array<T>>([]);
  const [error, setError] = useState({ value: false, message: '' });
  const [page, setPage] = useState(1);
  const [isLast, setLast] = useState(false);

  const sendQuery = async (page?: number) => {
    setLoading(true);
    try {
      const result = await queryFn(page);
      if (pagination.enabled && page === 1) {
        setData(result.data);
        setLast(result.isLast);
      } else if (pagination.enabled && page > 1) {
        setData([...data, ...result.data]);
        setLast(result.isLast);
      } else {
        setData(result);
      }
    } catch (error: any) {
      setError({ value: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const scrollHandler = () => {
    const elementRef = pagination.ref;
    if (window.scrollY + window.innerHeight + 1 >= elementRef?.current.clientHeight && !loading && !isLast) {
      sendQuery(page + 1);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (!loading) {
      setPage(1);
      sendQuery(1);
    }
  }, dependencies);

  useEffect(() => {
    sendQuery(1);
  }, []);

  useEffect(() => {
    if (pagination.enabled) {
      window.addEventListener('scroll', scrollHandler);
    }
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [page, loading, isLast]);

  return { loading, error, data, setData, get: sendQuery };
}

export default useQuery;
