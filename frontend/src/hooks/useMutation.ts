import { useState } from 'react';

type useMutationOptions = {
  onSuccess?: () => void;
  onError?: () => void;
};

const useMutation = (
  queryFn,
  { onSuccess, onError }: useMutationOptions = { onSuccess: () => {}, onError: () => {} },
) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState({ value: false, message: '' });

  const mutate = async () => {
    try {
      const result = await queryFn();
      setData(result);
      onSuccess();
    } catch (error) {
      setError({ value: true, message: error.message });
      onError();
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, data, error };
};

export default useMutation;
