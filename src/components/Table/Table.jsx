import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Columns } from '../../utils/constants';
import { Tooltip } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import AdditInfo from './AdditInfo';
import st from './Table.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import updateOneAddr from '../../utils/updateOneAddr';

function Row({ row }) {
  const [showRowData, setShowRowData] = useState(false);
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();
  if (update) {
    (async () => {
      await updateOneAddr(dispatch, row.collapse.address, row.label, row.number);
      setUpdate(false);
    })();
  }

  return (
    <>
      <TableRow tabIndex={-1} className={st.row} onClick={() => setShowRowData(!showRowData)}>
        {Columns.map((column) => {
          let value = row[column.id];
          return (
            <TableCell
              key={uuidv4()}
              align={column.align}
              sx={{ color: '#c4c0c0', border: '1px solid #272626' }}>
              {value}
            </TableCell>
          );
        })}
      </TableRow>
      {row.result === 'error' ? (
        <></>
      ) : (
        <AdditInfo
          collapseData={row.collapse}
          show={showRowData}
          update={update}
          setUpdate={setUpdate}
        />
      )}
    </>
  );
}

export default function WalletsTable() {
  const rows = useSelector((state) => state.red.table.data);
  return (
    <div>
      <TableContainer sx={{ maxHeight: '90vh' }}>
        <Table stickyHeader sx={{ background: '#1e1e1e' }}>
          <TableHead>
            <TableRow>
              {Columns.map((column) => {
                return (
                  <Tooltip title={column.hint ? column.hint : ''} key={uuidv4()}>
                    <TableCell
                      sx={{ background: '#2c2c2c', color: 'grey', border: '1px solid #1e1e1e' }}
                      className={st.tableHead}
                      align={column.align}
                      style={{ minWidth: column.minWidth, width: column.width }}>
                      {column.label}
                    </TableCell>
                  </Tooltip>
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
      {/* {!loadingData.loading ? <></> : <Loader loadingData={loadingData} />} */}
    </div>
  );
}
