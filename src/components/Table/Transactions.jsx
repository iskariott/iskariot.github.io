import { Box, Collapse } from '@mui/material';
import { useState } from 'react';
import st from './Transactions.module.scss';

export default function Transactions({ transaction }) {
  const [showTransactions, setShowTransactions] = useState(false);
  return (
    <>
      <div
        onClick={() => setShowTransactions(!showTransactions)}
        className={[st.summary, showTransactions ? st.clicked : ''].join(' ')}>
        {Object.keys(transaction)[0]}
      </div>
      <Collapse in={showTransactions} timeout="auto" unmountOnExit>
        {transaction[Object.keys(transaction)[0]].map((data) => (
          <Box
            sx={{
              display: 'flex',
              columnGap: '10px',
              borderBottom: '1px solid black',
            }}>
            <span>{data.date + ': '}</span>
            <Box
              sx={{
                display: 'grid',
              }}>
              <span>{'contract: ' + data.contract_name}</span>
              <span>{'fee: ' + data.fee}</span>
              <span>{'time: ' + data.time}</span>
              <span>{'txh: ' + data.hash}</span>
            </Box>
          </Box>
        ))}
      </Collapse>
    </>
  );
}
