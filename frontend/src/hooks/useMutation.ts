import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addNotification } from '@/store/notificationsSlice';

type useMutationOptions<T> = {
  onSuccess?: (mutationResult: any, args: T[]) => void;
  onError?: () => void;
};

function useMutation<T>(
  queryFn: (...args: T[]) => any,
  { onSuccess = () => {}, onError = () => {} }: useMutationOptions<T>,
) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState({ value: false, message: '' });

  const mutate = async (...args: T[]) => {
    setLoading(true);
    try {
      const result = await queryFn(...args);
      setData(result);
      onSuccess(result, args);
    } catch (error: any) {
      setError({ value: true, message: error.message });
      dispatch(addNotification({ id: Date.now(), message: error.message, type: 'error' }));
      onError();
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, data, error };
}

export default useMutation;
