import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StButton from '@components/StButton/StButton';
import updateData from '@starkUtils/update';
import StarkManageWallets from '@components/Starknet/StarkManageWallets';
import StarkTable from '../components/Starknet/StarkTable';

export default function Starknet() {
  const [isModalOpen, setModal] = useState(false);
  const input = useSelector((state) => state.red.input.data.stark);
  const dispatch = useDispatch();
  return (
    <>
      <StButton sx={{ mb: 1, mr: 2 }} onClick={() => setModal(true)}>
        manage wallets
      </StButton>
      <StButton sx={{ mb: 1 }} onClick={() => updateData(dispatch, input)}>
        update
      </StButton>
      <StarkManageWallets isModalOpen={isModalOpen} setModal={setModal} />
      <StarkTable />
    </>
  );
}
