import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Tooltip } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import RowList from './RowList';

export default function WalletsTable({ rows, updateAddr, columns, AdditInfo }) {
  return (
    <div>
      <TableContainer>
        <Table sx={{ background: '#1e1e1e' }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <Tooltip title={column.hint ? column.hint : ''} key={uuidv4()}>
                    <TableCell
                      sx={{ background: '#2c2c2c', color: 'grey', border: '1px solid #1e1e1e' }}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        width: column.width,
                        padding: column.padding,
                      }}>
                      {column.label}
                    </TableCell>
                  </Tooltip>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <RowList
                  row={row}
                  key={uuidv4()}
                  updateAddr={updateAddr}
                  AdditInfo={AdditInfo}
                  columns={columns}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {!loadingData.loading ? <></> : <Loader loadingData={loadingData} />} */}
    </div>
  );
}
