import { updateZkTable } from '@redux/tableSlice';
import { getTokensPrice } from '../common';
import { Tokens } from '../constants';
import getZksync from './getZksync';

export default async function updateCurrent(dispatch, address, label, id) {
  const ethPrice = await getTokensPrice(Tokens.eth);
  const resp = await getZksync(address, ethPrice);
  const data = {
    id,
    label,
    totalBalance: resp.totalBalance,
    balances: resp.balances,
    'bridge to/from': resp.bridgeTo + '/' + resp.bridgeFrom,
    volume: resp.volume,
    txsCount: resp.txCount,
    totalFee: resp.totalFee,
    mwd: resp.mwd,
    witm: resp.witm,
    uniqueContracts: resp.uniqueContracts,
    protocols: resp.protocols,
    address,
    transactions: resp.transactions,
    lite: resp.lite,
    result: resp.result,
  };
  dispatch(updateZkTable(data));
}
