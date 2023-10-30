import { updateAptTable } from '@redux/tableSlice';
import { getTokensPrice } from '../common';
import { Tokens } from '../constants';
import getAptos from './getAptos';

export default async function updateCurrent(dispatch, address, label, id) {
  const aptPrice = await getTokensPrice(Tokens.apt);
  const resp = await getAptos(address, aptPrice);
  const data = {
    id,
    label,
    // totalBalance: resp.totalBalance,
    APT: resp.APT,
    USDC: resp.USDC,
    USDT: resp.USDT,
    // DAI: resp.balances.DAI,
    txsCount: resp.txCount,
    totalFee: resp.totalFee,
    mwd: resp.mwd,
    witm: resp.witm,
    address,
    result: resp.result,
  };
  dispatch(updateAptTable(data));
}
