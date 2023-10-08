import { useEffect } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Starknet from '../Pages/Starknet';
import Zksync from '../Pages/Zksync';

const Root = () => {
  useEffect(() => {
    const currentVersion = '1.1';

    const storedVersion = localStorage.getItem('ver');
    if (storedVersion !== currentVersion) {
      localStorage.clear();
      localStorage.setItem('ver', currentVersion);
    }
  }, []);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'starknet',
        element: <Starknet />,
      },
      {
        path: 'zksync',
        element: <Zksync />,
      },
    ],
  },
]);
