import { useEffect, useState } from 'react';

const useQuery = (queryFn, { dependencies = [] } = {}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState({ value: false, message: '' });

  const sendQuery = async () => {
    try {
      const result = await queryFn();
      setData(result);
    } catch (error) {
      setError({ value: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sendQuery();
  }, dependencies);

  return { loading, error, data, setData };
};

export default useQuery;
