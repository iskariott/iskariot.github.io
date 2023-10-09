import { Box, Modal, TextField } from '@mui/material';
import st from './ManageWallets.module.scss';
import { useEffect, useState } from 'react';
import StButton from '../StButton/StButton';

export default function ManageWallets({
  isModalOpen,
  setModal,
  storedInputData,
  onClickConfirmBtn,
  inputData,
  setInputData,
}) {
  useEffect(() => {
    setInputData(storedInputData);
  }, []);

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
