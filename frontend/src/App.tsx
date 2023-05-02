import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import router from './router';
import { signIn } from './store/userSlice';

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const { id, firstName, lastName } = jwtDecode(token) as {
        id: number;
        firstName: string;
        lastName: string;
      };
      dispatch(signIn({ id, firstName, lastName }));
    }
    setLoading(false);
  }, []);

  return <div className="App">{!loading && <RouterProvider router={router} />}</div>;
};

export default App;
