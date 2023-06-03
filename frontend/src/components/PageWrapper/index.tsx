import { ReactNode } from 'react';

import { QueryError } from '@/lib/global/types';
import { Loader } from '@/ui-kit';
import { ErrorPage } from '@/components';

const PageWrapper = ({
  loading,
  error,
  children,
}: {
  loading: boolean;
  error: QueryError | QueryError[];
  children: ReactNode;
}) =>
  loading ? (
    <Loader />
  ) : (Array.isArray(error) && error.some(({ value }) => value)) || (!Array.isArray(error) && error.value) ? (
    <ErrorPage />
  ) : (
    <>{children}</>
  );

export default PageWrapper;
