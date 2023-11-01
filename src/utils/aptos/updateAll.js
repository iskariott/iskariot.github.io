import getAptos from './getAptos';
import { clearAptTable, setAptTable } from '@redux/tableSlice';
import { formatInputData, getTokensPrice } from '../common';
import { Tokens } from '../constants';
import { incrementLoadedCount, setLoaded, setLoading } from '@redux/loadSlice';

export default async function updateAll(dispatch, input) {
  if (!input) return;
  dispatch(clearAptTable());
  const aptPrice = await getTokensPrice(Tokens.apt);
  let allWalletsBalance = 0;
  let allWalletsGasBurn = 0;
  const formatedInput = formatInputData(input);
  const data = [];
  dispatch(setLoading(formatedInput.length));
  for (let i = 0; i < formatedInput.length; i++) {
    dispatch(incrementLoadedCount());
    const resp = await getAptos(formatedInput[i].address, aptPrice);
    allWalletsBalance += resp.totalBalance;
    allWalletsGasBurn += resp.totalFee;
    data.push({
      id: i,
      label: formatedInput[i].label,
      totalBalance: resp.totalBalance,
      APT: resp.APT,
      USDC: resp.USDC,
      USDT: resp.USDT,
      txsCount: resp.txCount,
      totalFee: '$' + resp.totalFee.toFixed(2),
      mwd: resp.mwd,
      witm: resp.witm,
      address: formatedInput[i].address,
      result: resp.result,
    });
  }
  dispatch(
    setAptTable({
      wal: data,
      total: {
        wallets: formatedInput.length,
        balance: allWalletsBalance,
        gas: allWalletsGasBurn,
      },
    }),
  );
  dispatch(setLoaded());
}
