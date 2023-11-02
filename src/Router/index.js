import { useEffect } from 'react';
import { createHashRouter, Outlet } from 'react-router-dom';
import Header from '@components/Header/Header';
import Zksync from '@pages/Zksync/Zksync';
import Aptos from '@pages/Aptos/Aptos';
import Starknet from '@pages/Starknet/Starknet';
import ScrollToTop from '@components/ScrollTop/ScrollTop';
import Home from '@pages/Home/Home';
import { useDispatch } from 'react-redux';
import { resetInput } from '@redux/inputSlice';
import { resetTable } from '@redux/tableSlice';

const Root = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const currentVersion = '1.5';
    const storedVersion = localStorage.getItem('ver');
    if (storedVersion !== currentVersion) {
      localStorage.clear();
      dispatch(resetInput());
      dispatch(resetTable());
      localStorage.setItem('ver', currentVersion);
    }
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <ScrollToTop />
    </>
  );
};

export const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'aptos',
        element: <Aptos />,
      },
      {
        path: 'zksync',
        element: <Zksync />,
      },
      {
        path: 'starknet',
        element: <Starknet />,
      },
    ],
  },
]);
