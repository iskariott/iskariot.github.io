import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ManageWallets from './components/ManageWallets/ManageWallets';
import WalletsTable from './components/Table/Table';
import getWalletData from './utils/getWalletData';
import './App.scss';
import StButton from './components/StButton/StButton';

function App() {
  const [isModalOpen, setModal] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const inputData = useSelector((state) => state.red.input.data);

  useEffect(() => {
    (async () => {
      setTableRows([]);
      const respInp = await getWalletData(inputData);
      if (!respInp) return;
      setTableRows(respInp);
    })();
    console.log('update');
  }, [inputData]);

  return (
    <div className="App">
      <StButton sx={{ mb: 1 }} onClick={() => setModal(true)}>
        manage wallets
      </StButton>
      <ManageWallets isModalOpen={isModalOpen} setModal={setModal} setTableRows={setTableRows} />
      <WalletsTable rows={tableRows} />
    </div>
  );
}

export default App;
