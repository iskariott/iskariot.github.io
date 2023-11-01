import getStarknet from './getStarknet';
import { clearStarkTable, setStarkTable } from '@redux/tableSlice';
import { formatInputData, getTokensPrice, timer } from '../common';
import { Tokens } from '../constants';
import { incrementLoadedCount, setLoaded, setLoading } from '@redux/loadSlice';
import { setDelay } from '../../redux/loadSlice';

export default async function updateAll(dispatch, input) {
  if (!input) return;
  dispatch(clearStarkTable());
  const ethPrice = await getTokensPrice(Tokens.eth);
  const formatedInput = formatInputData(input);
  let allWalletsBalance = 0;
  let allWalletsFee = 0;
  dispatch(setLoading(formatedInput.length));
  const data = [];
  let count = 29;
  for (let i = 0; i < formatedInput.length; i++) {
    if (i === count) {
      dispatch(setDelay(true));
      await timer(90000);
      dispatch(setDelay(false));
      count += 30;
    }
    dispatch(incrementLoadedCount());
    const resp = await getStarknet(formatedInput[i].address, ethPrice);
    allWalletsBalance += resp.totalBalance;
    allWalletsFee += resp.totalFee;
    data.push({
      id: i,
      label: formatedInput[i].label,
      totalBalance: resp.totalBalance,
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
      result: resp.result,
    });
  }
  dispatch(
    setStarkTable({
      wal: data,
      total: { wallets: formatedInput.length, gas: allWalletsFee, balance: allWalletsBalance },
    }),
  );
  dispatch(setLoaded());
}
