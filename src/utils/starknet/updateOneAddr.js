import getStark from '.';
import { updateStarkTable } from '@redux/tableSlice';
import getTableObject from './helpers/getTableObject';

export default async function updateOneAddr(dispatch, address, label, id) {
  const resp = await getStark(address);
  const data = getTableObject(
    id,
    label,
    resp.balance,
    resp.bridge.DepositTx,
    resp.volume,
    resp.tx,
    resp.fee,
    resp.activity,
    resp.witm,
    resp.domain,
    address,
    resp.transactions,
    resp.contracts,
    resp.result,
  );
  dispatch(updateStarkTable(data));
}
