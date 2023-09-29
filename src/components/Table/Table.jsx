import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Columns } from '../../utils/constants';
import { Box, Button, Collapse } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { v4 as uuidv4 } from 'uuid';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';

// const rows = [
//   {
//     number: '1',
//     label: 'asdasd',
//     balance: '123',
//     offbridge: 'yes',
//     volume: '123',
//     txs: '15',
//     mwd: '1-2-4',
//     currActWeeks: '1',
//   },
//   {
//     number: '2',
//     label: 'asdasd',
//     balance: '123',
//     offbridge: 'yes',
//     volume: '123',
//     txs: '15',
//     mwd: '1-2-4',
//     currActWeeks: '1',
//   },
//   {
//     number: '3',
//     label: 'asdasd',
//     balance: '123',
//     offbridge: 'yes',
//     volume: '123',
//     txs: '15',
//     mwd: '1-2-4',
//     currActWeeks: '1',
//   },
//   {
//     number: '4',
//     label: 'asdasd',
//     balance: '123',
//     offbridge: 'yes',
//     volume: '123',
//     txs: '15',
//     mwd: '1-2-4',
//     currActWeeks: '1',
//   },
//   {
//     number: '',
//     label: 'asdasd',
//     balance: '123',
//     offbridge: 'yes',
//     volume: '123',
//     txs: '15',
//     mwd: '1-2-4',
//     currActWeeks: '1',
//   },
//   {
//     number: '',
//     label: 'asdasd',
//     balance: '123',
//     offbridge: 'yes',
//     volume: '123',
//     txs: '15',
//     mwd: '1-2-4',
//     currActWeeks: '1',
//   },
//   {
//     number: '',
//     label: 'asdasd',
//     balance: '123',
//     offbridge: 'yes',
//     volume: '123',
//     txs: '15',
//     mwd: '1-2-4',
//     currActWeeks: '1',
//   },
//   {
//     number: '',
//     label: 'asdasd',
//     balance: '123',
//     offbridge: 'yes',
//     volume: '123',
//     txs: '15',
//     mwd: '1-2-4',
//     currActWeeks: '1',
//   },
// ];

function Row({ row }) {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <TableRow tabIndex={-1}>
        {Columns.map((column) => {
          let value = row[column.id];
          if ('details' === column.id)
            value = (
              <Button sx={{ minWidth: '5px' }} onClick={() => setShow(!show)} color={'primary'}>
                <ArrowDropDownIcon />
              </Button>
            );
          return (
            <TableCell
              key={uuidv4()}
              align={column.align}
              sx={{ color: 'rgb(196, 192, 192)', border: '1px solid #272626' }}>
              {value}
            </TableCell>
          );
        })}
      </TableRow>

      {/* <Collapse in={show} timeout="auto" unmountOnExit>
        фівфі
      </Collapse> */}
    </>
  );
}

export default function WalletsTable({ rows }) {
  const inputData = useSelector((state) => state.red.input.data);

  return (
    <div>
      <TableContainer sx={{ maxHeight: '90vh' }}>
        <Table stickyHeader sx={{ background: '#1e1e1e' }}>
          <TableHead>
            <TableRow>
              {Columns.map((column) => {
                return (
                  <TableCell
                    sx={{ background: '#2c2c2c', color: 'grey', border: '1px solid #1e1e1e' }}
                    key={uuidv4()}
                    align={column.align}
                    style={{ minWidth: column.minWidth, width: column.width }}>
                    {column.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return <Row row={row} key={uuidv4()} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length && inputData ? <></> : <Loader />}
    </div>
  );
}
