import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress, TableCell, TableRow } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import st from './RowList.module.scss';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function RowList({ row, updateAddr, columns, AdditInfo }) {
  const [showRowData, setShowRowData] = useState(false);
  const [isAddressUpdating, setIsAddressUpdating] = useState(false);

  const onClickUpdate = async () => {
    setIsAddressUpdating(true);
    await updateAddr(dispatch, row.address, row.label, row.id);
    setIsAddressUpdating(false);
  };

  const dispatch = useDispatch();

  const getValue = (id) => {
    switch (id) {
      case 'address':
        return (
          <span
            className={st.addr}
            onClick={() => {
              navigator.clipboard.writeText(row.address);
            }}>
            {row[id].slice(0, 4) + '...' + row[id].slice(-4)}
          </span>
        );
      case 'update':
        return isAddressUpdating ? (
          <CircularProgress size={24} />
        ) : (
          <RefreshIcon className={st.rowBtn} onClick={onClickUpdate} />
        );
      case 'more':
        return (
          <ArrowDropDownIcon className={st.rowBtn} onClick={() => setShowRowData(!showRowData)} />
        );
      default:
        return row[id];
    }
  };

  return (
    <>
      <TableRow>
        {columns.map((column) => {
          const value = getValue(column.id);
          return (
            <TableCell
              key={uuidv4()}
              align={column.align}
              sx={{ color: '#c4c0c0', border: '1px solid #272626', padding: column.padding }}>
              <span></span>
              {value}
            </TableCell>
          );
        })}
      </TableRow>
      {row.result && AdditInfo ? <AdditInfo row={row} show={showRowData} /> : <></>}
    </>
  );
}
