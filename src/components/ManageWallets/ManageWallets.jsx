import { Box, Modal, TextField } from '@mui/material';
import st from './ManageWallets.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { set } from '../../redux/inputSlice';
import { useEffect, useState } from 'react';
import StButton from '../StButton/StButton';
import updateData from '../../utils/starknet/update';

export default function ManageWallets(props) {
  const { isModalOpen, setModal } = props;
  const [inputData, setInputData] = useState('');
  const dispatch = useDispatch();
  const storedInputData = useSelector((state) => state.red.input.data);
  const storedTableData = useSelector((state) => state.red.table.data);

  useEffect(() => {
    setInputData(storedInputData);
  }, []);

  const onClickConfirmBtn = async () => {
    setModal(false);
    if (!inputData) return;
    updateData(dispatch, inputData);
    dispatch(set(inputData));
  };

  return (
    <Modal open={isModalOpen} onClose={() => setModal(false)}>
      <Box className={st.container}>
        <TextField
          id="outlined-basic"
          placeholder={`label1 0x0001...\nlabel2 0x0002...\n`}
          variant="outlined"
          multiline
          maxRows={15}
          className={st.textField}
          onChange={(e) => setInputData(e.target.value)}
          value={inputData}
        />
        <StButton onClick={onClickConfirmBtn} sx={{ alignSelf: 'center', width: '50%' }}>
          confirm
        </StButton>
      </Box>
    </Modal>
  );
}
