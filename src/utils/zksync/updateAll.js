import getZksync from './getZksync';
import { clearZkTable, setZkTable } from '@redux/tableSlice';
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
  dispatch(clearZkTable());
  const ethPrice = await getTokensPrice(Tokens.eth);
  const formatedInput = formatInputData(input);
  let allWalletsBalance = 0;
  let allWalletsFee = 0;
  for (let i = 0; i < formatedInput.length; i++) {
    const resp = await getZksync(formatedInput[i].address, ethPrice);
    allWalletsBalance += resp.totalBalance;
    allWalletsFee += resp.totalFee;
    const data = {
      id: i,
      label: formatedInput[i].label,
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
      address: formatedInput[i].address,
      transactions: resp.transactions,
      lite: resp.lite,
      result: resp.result,
    };
    dispatch(setZkTable(data));
  }
}
