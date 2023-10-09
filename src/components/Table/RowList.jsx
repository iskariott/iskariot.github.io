import updateOneAddr from '../../utils/starknet/updateOneAddr';
import RemoveIcon from '@mui/icons-material/Remove';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AdditInfo from './AdditInfo';
import { TableCell, TableRow } from '@mui/material';
import { Columns } from '@starkUtils/helpers/constants';
import { v4 as uuidv4 } from 'uuid';
import st from './RowList.module.scss';

export default function RowList({ row, updateAddr }) {
  const [showRowData, setShowRowData] = useState(false);
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();
  if (update) {
    (async () => {
      await updateAddr(dispatch, row.collapse.address, row.label, row.number);
      setUpdate(false);
    })();
  }
  return (
    <>
      <TableRow tabIndex={-1} className={st.row} onClick={() => setShowRowData(!showRowData)}>
        {Columns.map((column) => {
          let value = '';
          if (column.id === 'starkgate')
            value = row[column.id] ? (
              <KeyboardArrowDownIcon color="success" />
            ) : (
              <RemoveIcon color="error" />
            );
          else if (column.id === 'domain')
            value = row[column.id] ? (
              <KeyboardArrowDownIcon color="success" />
            ) : (
              <RemoveIcon color="error" />
            );
          else value = row[column.id];
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
