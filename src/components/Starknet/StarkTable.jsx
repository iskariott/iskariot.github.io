import { useSelector } from 'react-redux';
import updateOneAddr from '@starkUtils/updateOneAddr';
import WalletsTable from '../Table/Table';

export default function StarkTable() {
  const rows = useSelector((state) => state.red.table.data);
  return <WalletsTable rows={rows} updateAddr={updateOneAddr} />;
}
