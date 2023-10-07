import getStark from '.';
import { clearTable, setTable } from '../redux/tableSlice';

const formatInputData = (input) => {
  return input.split(/\r?\n/).flatMap((itm) => {
    const tmp = itm.split(' ');
    if (tmp[0].slice(0, 2) === '0x') return { label: '', address: tmp[0] };
    else return { label: tmp[0], address: tmp[1] };
  });
};

export default async function updateData(dispatch, input) {
  if (!input) return;
  dispatch(clearTable());
  const formatedInput = formatInputData(input);
  for (let i = 0; i < formatedInput.length; i++) {
    const resp = await getStark(formatedInput[i].address);
    dispatch(
      setTable({
        number: i + 1,
        label: formatedInput[i].label,
        balance: resp.balance.total,
        offbridge: resp.bridge.DepositTx ? 'yes' : 'no',
        volume: resp.volume,
        txs: resp.tx,
        fee: resp.fee,
        contract: resp.activity.contractActivity,
        mwd: `${resp.activity.monthActivity}/${resp.activity.weekActivity}/${resp.activity.dayActivity}`,
        witm: resp.witm,
        collapse: {
          address: formatedInput[i].address,
          balance: resp.balance.tokens,
          transactions: resp.transactions,
        },
        result: resp.result,
      }),
    );
  }
}
