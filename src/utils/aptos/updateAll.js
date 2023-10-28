import getAptos from './getAptos';
import { clearAptTable, setAptTable } from '@redux/tableSlice';
import { getTokensPrice } from '../common';
import { Tokens } from '../constants';

const formatInputData = (input) => {
  return input.split(/\r?\n/).flatMap((itm) => {
    const tmp = itm.trim().split(' ');
    if (!tmp[0] && !tmp[1]) return [];
    else if (tmp[0].slice(0, 2) === '0x') return { label: '', address: tmp[0] };
    else return { label: tmp[0], address: tmp[1] };
  });
};

export default async function updateAll(dispatch, input) {
  if (!input) return;
  dispatch(clearAptTable());
  const aptPrice = await getTokensPrice(Tokens.apt);
  const formatedInput = formatInputData(input);
  for (let i = 0; i < formatedInput.length; i++) {
    const resp = await getAptos(formatedInput[i].address, aptPrice);
    const data = {
      id: i + 1,
      label: formatedInput[i].label,
      totalBalance: resp.totalBalance,
      APT: resp.balances.APT,
      USDC: resp.balances.USDC,
      USDT: resp.balances.USDT,
      DAI: resp.balances.DAI,
      txsCount: resp.txCount,
      totalFee: resp.totalFee,
      mwd: resp.mwd,
      witm: resp.witm,
      address: formatedInput[i].address,
      result: resp.result,
    };
    dispatch(setAptTable(data));
  }
}
