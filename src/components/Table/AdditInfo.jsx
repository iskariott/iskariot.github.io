import Transactions from './Transactions';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Collapse } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import StButton from '../StButton/StButton';
import ContractAvatar from '../ContractAvatar/ContractAvatar';
import st from './AdditInfo.module.scss';

export default function AdditInfo({ show, row, setUpdate, MoreInfo }) {
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
        colSpan={13}>
        <Collapse in={show} timeout="auto" unmountOnExit>
          <div>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow sx={{ display: 'grid', rowGap: '5px', margin: '10px 0' }}>
                  <div className={st.headContainer}>
                    <span
                      className={st.addr}
                      onClick={() => {
                        navigator.clipboard.writeText(row.address);
                      }}>
                      {row.address.slice(0, 6) + '...' + row.address.slice(-4)}
                    </span>
                    <StButton sx={{ width: '120px', fontSize: '10px', padding: '5px 0' }}>
                      update address
                    </StButton>
                  </div>

                  <Box
                    component="div"
                    sx={{ display: 'flex', columnGap: '25px', m: '15px 0 5px 0' }}>
                    {Object.keys(row.protocols).map((key) => (
                      <ContractAvatar
                        key={uuidv4()}
                        contract={{
                          name: key,
                          url: row.protocols[key].url,
                          count: row.protocols[key].count,
                        }}
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', columnGap: '10px' }}>
                    Balances:
                    {Object.keys(row.balances).map((b) => (
                      <div key={uuidv4()}> {`${b} ${row.balances[b]}`}</div>
                    ))}
                  </Box>

                  {MoreInfo ? <MoreInfo row={row} /> : <></>}
                  {row.isTransactionsHistory ? (
                    row.transactions.map((t) => <Transactions transaction={t} key={uuidv4()} />)
                  ) : (
                    <></>
                  )}
                </TableRow>
              </TableHead>
            </Table>
          </div>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}
