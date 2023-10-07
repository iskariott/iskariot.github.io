import getStark from '.';
import { updateTable } from '../redux/tableSlice';

export default async function updateOneAddr(dispatch, address, label, id) {
  const resp = await getStark(address);
  dispatch(
    updateTable({
      number: id,
      label: label,
      balance: resp.balance.total,
      offbridge: resp.bridge.DepositTx ? 'yes' : 'no',
      volume: resp.volume,
      txs: resp.tx,
      fee: resp.fee,
      contract: resp.activity.contractActivity,
      mwd: `${resp.activity.monthActivity}/${resp.activity.weekActivity}/${resp.activity.dayActivity}`,
      witm: resp.witm,
      collapse: {
        address: address,
        balance: resp.balance.tokens,
        transactions: resp.transactions,
      },
      result: resp.result,
    }),
  );
}
