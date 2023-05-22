import { useState } from 'react';

type useMutationOptions<T> = {
  onSuccess?: (mutationResult: any, args: T[]) => void;
  onError?: () => void;
};

function useMutation<T>(
  queryFn: (...args: T[]) => any,
  { onSuccess = () => {}, onError = () => {} }: useMutationOptions<T>,
) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState({ value: false, message: '' });

  const mutate = async (...args: T[]) => {
    try {
      const result = await queryFn(...args);
      setData(result);
      onSuccess(result, args);
    } catch (error: any) {
      setError({ value: true, message: error.message });
      onError();
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, data, error };
}

export default useMutation;
