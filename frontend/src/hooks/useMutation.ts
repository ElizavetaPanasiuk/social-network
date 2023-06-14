import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addNotification } from '@/store/notificationsSlice';

type useMutationOptions<T_ARGS, T_RESPONSE> = {
  onSuccess?: (mutationResult: T_RESPONSE, args: T_ARGS) => void;
  onError?: () => void;
};

function useMutation<T_ARGS extends unknown[], T_RESPONSE>(
  queryFn: (...args: T_ARGS) => Promise<T_RESPONSE>,
  { onSuccess = () => {}, onError = () => {} }: useMutationOptions<T_ARGS, T_RESPONSE> = {},
) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T_RESPONSE>();
  const [error, setError] = useState({ value: false, message: '' });

  const mutate = async (...args: T_ARGS) => {
    setLoading(true);
    try {
      const result = await queryFn(...args);
      setData(result);
      onSuccess(result, args);
    } catch (error) {
      if (error instanceof Error) {
        setError({ value: true, message: error.message });
        dispatch(addNotification({ id: Date.now(), message: error.message, type: 'error' }));
        onError();
      }
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, data, error };
}

export default useMutation;
