import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ManageWallets from './components/ManageWallets/ManageWallets';
import WalletsTable from './components/Table/Table';
import StButton from './components/StButton/StButton';
import './App.scss';
import updateData from './utils/updateData';

function App() {
  const [isModalOpen, setModal] = useState(false);
  const input = useSelector((state) => state.red.input.data);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <StButton sx={{ mb: 1, mr: 2 }} onClick={() => setModal(true)}>
        manage wallets
      </StButton>
      <StButton sx={{ mb: 1 }} onClick={() => updateData(dispatch, input)}>
        update
      </StButton>
      <ManageWallets isModalOpen={isModalOpen} setModal={setModal} />
      <WalletsTable />
    </div>
  );
}

export default App;
