import { useEffect, useState } from 'react';

const useQuery = (queryFn, { dependencies = [], pagination = { enabled: false, ref: null } } = {}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState({ value: false, message: '' });
  const [page, setPage] = useState(1);
  const [isLast, setLast] = useState(false);

  const sendQuery = async (...args) => {
    setLoading(true);
    try {
      const result = await queryFn(...args);
      if (pagination.enabled) {
        setData([...data, ...result.data]);
        setLast(result.isLast);
      } else {
        setData(result);
      }
    } catch (error) {
      setError({ value: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const scrollHandler = () => {
    const elementRef = pagination.ref;
    if (window.scrollY + window.innerHeight + 1 >= elementRef.current.clientHeight && !loading && !isLast) {
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
};

export default useQuery;
