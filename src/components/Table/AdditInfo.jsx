import Transactions from './Transactions';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Collapse } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import StButton from '../StButton/StButton';
import ContractAvatar from '../ContractAvatar/ContractAvatar';

export default function AdditInfo({ show, collapseData, setUpdate }) {
  return (
    <TableRow>
      <TableCell
        style={{
          paddingBottom: 0,
          paddingTop: 0,
          border: '0px',
          color: '#c4c0c0',
          background: '#2c2c2c',
        }}
        colSpan={11}>
        <Collapse in={show} timeout="auto" unmountOnExit>
          <div>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow sx={{ display: 'grid', rowGap: '5px', margin: '10px 0' }}>
                  <StButton
                    onClick={() => setUpdate(true)}
                    sx={{ width: '120px', fontSize: '10px', padding: '5px 0' }}>
                    update address
                  </StButton>
                  <Box
                    component="div"
                    sx={{ display: 'flex', columnGap: '20px', m: '15px 0 5px 0' }}>
                    {collapseData.contracts.map((c) => (
                      <ContractAvatar key={uuidv4()} contract={c} />
                    ))}
                  </Box>
                  <div>Address: {collapseData.address}</div>
                  <Box sx={{ display: 'flex', columnGap: '5px' }}>
                    Balance:
                    {collapseData.balance.map((t) => (
                      <div key={uuidv4()}> {`${t.token} ${t.value}`}</div>
                    ))}
                  </Box>
                  {collapseData.transactions.map((t) => (
                    <Transactions transaction={t} key={uuidv4()} />
                  ))}
                </TableRow>
              </TableHead>
            </Table>
          </div>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}
