import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import updateData from '@starkUtils/update';
import ManageWallets from '@components/ManageWallets/ManageWallets';
import { setStarkInput } from '@redux/inputSlice';

export default function StarkManageWallets({ isModalOpen, setModal }) {
  const [inputData, setInputData] = useState('');
  const dispatch = useDispatch();
  const storedInputData = useSelector((state) => state.red.input.data.stark);

  useEffect(() => {
    setInputData(storedInputData);
  }, []);

  const onClickConfirmBtn = async () => {
    setModal(false);
    if (!inputData) return;
    updateData(dispatch, inputData);
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
