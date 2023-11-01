import getZksync from './getZksync';
import { clearZkTable, setZkTable } from '@redux/tableSlice';
import { formatInputData, getTokensPrice } from '../common';
import { Tokens } from '../constants';
import { incrementLoadedCount, setLoaded, setLoading } from '@redux/loadSlice';

export default async function updateAll(dispatch, input) {
  if (!input) return;
  dispatch(clearZkTable());
  const ethPrice = await getTokensPrice(Tokens.eth);
  const formatedInput = formatInputData(input);
  let allWalletsBalance = 0;
  let allWalletsFee = 0;
  const data = [];
  dispatch(setLoading(formatedInput.length));
  for (let i = 0; i < formatedInput.length; i++) {
    dispatch(incrementLoadedCount());
    const resp = await getZksync(formatedInput[i].address, ethPrice);
    allWalletsBalance += resp.totalBalance;
    allWalletsFee += resp.totalFee;
    data.push({
      id: i,
      label: formatedInput[i].label,
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
      address: formatedInput[i].address,
      transactions: resp.transactions,
      lite: resp.lite,
      result: resp.result,
    });
  }
  dispatch(
    setZkTable({
      wal: data,
      total: { wallets: formatedInput.length, gas: allWalletsFee, balance: allWalletsBalance },
    }),
  );
  dispatch(setLoaded());
}
