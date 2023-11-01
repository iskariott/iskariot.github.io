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
    // balances: resp.balances,
    ETH: resp.ETH,
    WETH: resp.WETH,
    USDC: resp.USDC,
    USDT: resp.USDT,
    'bridge to/from': resp.bridgeTo + '/' + resp.bridgeFrom,
    volume: '$' + resp.volume.toFixed(2),
    txsCount: resp.txCount,
    totalFee: '$' + resp.totalFee.toFixed(2),
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
