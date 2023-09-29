import getActivity from './getActivity';
import { getBridge } from './getBridges';
import getThisMonthActivity from './getThisMonthActivity';
import getTokenBalance from './getTokenBalances';
import { getTransactionsList } from './getTransactions';
import { getVolume } from './getVolume';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RemoveIcon from '@mui/icons-material/Remove';
import getTokenPrice from './getTokenPrice';
import { Tokens } from './constants';

export default async function getWalletData(inputData) {
  const ethPrice = await getTokenPrice(Tokens.eth);

  if (!inputData) return;
  const splittetData = inputData.split(/\r?\n/);
  const formatedData = [];
  for (let wl of splittetData) {
    const tmp = wl.split(' ');
    formatedData.push({ label: tmp[0], addr: tmp[1] });
  }

  const walletData = [];
  for (let i = 0; i < formatedData.length; i++) {
    const transactions = await getTransactionsList(formatedData[i].addr, ethPrice);
    const activity = await getActivity(transactions, ethPrice);
    const balance = await getTokenBalance(formatedData[i].addr);
    const volume = getVolume(transactions);
    const currActWeeks = getThisMonthActivity(transactions);
    const { bridgeInteraction } = await getBridge(formatedData[i].addr, ethPrice);
    const txs = transactions.length;
    walletData.push({
      number: i + 1,
      label: formatedData[i].label,
      balance,
      offbridge: bridgeInteraction ? (
        <KeyboardArrowDownIcon color="success" />
      ) : (
        <RemoveIcon color="error" />
      ),
      volume,
      txs,
      mwd: `${activity.activeMonths}/${activity.activeWeeks}`,
      currActWeeks,
      fee: activity.fee,
    });
  }
  return walletData;
}
