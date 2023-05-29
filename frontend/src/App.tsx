import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import router from './router';
import { signIn, signOut } from './store/userSlice';
import { Loader } from './ui-kit';

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const { id, firstName, lastName, exp } = jwtDecode(token) as {
        id: number;
        firstName: string;
        lastName: string;
        exp: number;
      };
      if (exp * 1000 <= Date.now()) {
        dispatch(signOut());
        Cookies.remove('token');
      }
      dispatch(signIn({ id, firstName, lastName }));
    }
    setLoading(false);
  }, []);

  return <div className="App">{loading ? <Loader /> : <RouterProvider router={router} />}</div>;
};

export default App;
