import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { Sidebar } from '@/components';

import styles from './styles.module.scss';

const Layout = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  return isAuth ? (
    <>
      <div className={styles.layout}>
        <Sidebar />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Layout;
