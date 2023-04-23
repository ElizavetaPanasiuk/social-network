import { useEffect, useState } from "react";

const useQuery = (query) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const sendQuery = async () => {
    const result = await query();
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    sendQuery();
  }, []);

  return [loading, data, setData];
};

export default useQuery;
