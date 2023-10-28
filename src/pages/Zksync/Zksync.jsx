import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ManageWallets from '@components/ManageWallets/ManageWallets';
import { setZkInput } from '@redux/inputSlice';
import WalletsTable from '@components/Table/Table';
import StButton from '@components/StButton/StButton';
import updateAll from '@utils/zksync/updateAll';
import updateCurrent from '@utils/zksync/updateCurrent';
import { Box } from '@mui/material';
import { Columns } from '@utils/zksync/constants';
import AdditInfo from './AdditInfo';

function ZkManageWallets({ isModalOpen, setModal }) {
  const [inputData, setInputData] = useState('');
  const dispatch = useDispatch();
  const storedInputData = useSelector((state) => state.red.input.data.zk);
  console.log('Columns = ', Columns);

  useEffect(() => {
    setInputData(storedInputData);
  }, []);

  const onClickConfirmBtn = async () => {
    setModal(false);
    if (!inputData) return;
    updateAll(dispatch, inputData);
    dispatch(setZkInput(inputData));
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

function ZkTable() {
  const rows = useSelector((state) => state.red.table.data.zk);
  const Comp = () =>
    rows.length ? (
      <WalletsTable
        rows={rows}
        updateAddr={updateCurrent}
        AdditInfo={AdditInfo}
        columns={Columns}
      />
    ) : (
      <></>
    );
  return <Comp />;
}

export default function Zksync() {
  const [isModalOpen, setModal] = useState(false);
  const input = useSelector((state) => state.red.input.data.zk);
  const dispatch = useDispatch();
  return (
    <>
      <StButton sx={{ mb: 1, mr: 2 }} onClick={() => setModal(true)}>
        manage wallets
      </StButton>
      <StButton sx={{ mb: 1 }} onClick={() => updateAll(dispatch, input)}>
        update
      </StButton>
      <ZkManageWallets isModalOpen={isModalOpen} setModal={setModal} />
      <ZkTable />
    </>
  );
}
