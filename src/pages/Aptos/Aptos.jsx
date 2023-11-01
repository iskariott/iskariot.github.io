import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ManageWallets from '@components/ManageWallets/ManageWallets';
import { setAptInput } from '@redux/inputSlice';
import WalletsTable from '@components/Table/Table';
import StButton from '@components/StButton/StButton';
import updateAll from '@utils/aptos/updateAll';
import updateCurrent from '@utils/aptos/updateCurrent';
import { Columns } from '@utils/aptos/constants';
import LoadProgress from '@components/Loader/Loader';

function AptManageWallets({ isModalOpen, setModal }) {
  const [inputData, setInputData] = useState('');
  const dispatch = useDispatch();
  const storedInputData = useSelector((state) => state.red.input.data.apt);

  useEffect(() => {
    setInputData(storedInputData);
  }, []);

  const onClickConfirmBtn = async () => {
    setModal(false);
    if (!inputData) return;
    updateAll(dispatch, inputData);
    dispatch(setAptInput(inputData));
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

function AptTable() {
  const rows = useSelector((state) => state.red.table.data.apt.wal);

  const Comp = () =>
    rows.length ? <WalletsTable rows={rows} updateAddr={updateCurrent} columns={Columns} /> : <></>;
  return <Comp />;
}

export default function Aptos() {
  const [isModalOpen, setModal] = useState(false);
  const input = useSelector((state) => state.red.input.data.apt);
  const dispatch = useDispatch();
  return (
    <>
      <StButton sx={{ mb: 1, mr: 2 }} onClick={() => setModal(true)}>
        manage wallets
      </StButton>
      <StButton sx={{ mb: 1 }} onClick={() => updateAll(dispatch, input)}>
        update
      </StButton>
      <AptManageWallets isModalOpen={isModalOpen} setModal={setModal} />
      <AptTable />
      <LoadProgress />
    </>
  );
}
