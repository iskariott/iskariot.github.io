import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ManageWallets from '@components/ManageWallets/ManageWallets';
import { setStarkInput } from '@redux/inputSlice';
import WalletsTable from '@components/Table/Table';
import StButton from '@components/StButton/StButton';
import updateAll from '@utils/starknet/updateAll';
import updateCurrent from '@utils/starknet/updateCurrent';
import { Columns } from '@utils/starknet/constants';

function StarkManageWallets({ isModalOpen, setModal }) {
  const [inputData, setInputData] = useState('');
  const dispatch = useDispatch();
  const storedInputData = useSelector((state) => state.red.input.data.stark);

  useEffect(() => {
    setInputData(storedInputData);
  }, []);

  const onClickConfirmBtn = async () => {
    setModal(false);
    if (!inputData) return;
    updateAll(dispatch, inputData);
    dispatch(setStarkInput(inputData));
  };

  return (
    <ManageWallets
      isModalOpen={isModalOpen}
      setModal={setModal}
      storedInputData={storedInputData}
      onClickConfirmBtn={onClickConfirmBtn}
      inputData={inputData}
      setInputData={setInputData}
    />
  );
}

function StarkTable() {
  const rows = useSelector((state) => state.red.table.data.stark);
  const Comp = () =>
    rows.length ? <WalletsTable rows={rows} updateAddr={updateCurrent} columns={Columns} /> : <></>;
  return <Comp />;
}

export default function Starknet() {
  const [isModalOpen, setModal] = useState(false);
  const input = useSelector((state) => state.red.input.data.stark);
  const dispatch = useDispatch();
  return (
    <>
      <StButton sx={{ mb: 1, mr: 2 }} onClick={() => setModal(true)}>
        manage wallets
      </StButton>
      <StButton sx={{ mb: 1 }} onClick={() => updateAll(dispatch, input)}>
        update
      </StButton>
      <StarkManageWallets isModalOpen={isModalOpen} setModal={setModal} />
      <StarkTable />
    </>
  );
}
