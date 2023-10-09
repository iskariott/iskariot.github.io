import getStark from '.';
import { clearStarkTable, setStarkTable } from '@redux/tableSlice';
import getTableObject from './helpers/getTableObject';

const formatInputData = (input) => {
  return input.split(/\r?\n/).flatMap((itm) => {
    const tmp = itm.split(' ');
    if (tmp[0].slice(0, 2) === '0x') return { label: '', address: tmp[0] };
    else return { label: tmp[0], address: tmp[1] };
  });
};

export default async function updateData(dispatch, input) {
  if (!input) return;
  dispatch(clearStarkTable());
  const formatedInput = formatInputData(input);
  for (let i = 0; i < formatedInput.length; i++) {
    const resp = await getStark(formatedInput[i].address);
    const data = getTableObject(
      i + 1,
      formatedInput[i].label,
      resp.balance,
      resp.bridge.DepositTx,
      resp.volume,
      resp.tx,
      resp.fee,
      resp.activity,
      resp.witm,
      resp.domain,
      formatedInput[i].address,
      resp.transactions,
      resp.contracts,
      resp.result,
    );
    dispatch(setStarkTable(data));
  }
}
