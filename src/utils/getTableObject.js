import RemoveIcon from '@mui/icons-material/Remove';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function getTableObject(
  number,
  label,
  balance,
  starkgate,
  volume,
  txs,
  fee,
  activity,
  witm,
  domain,
  address,
  transactions,
  contracts,
  result,
) {
  return {
    number,
    label,
    balance: balance.total,
    starkgate: starkgate ? <KeyboardArrowDownIcon color="success" /> : <RemoveIcon color="error" />,
    volume,
    txs,
    fee,
    contractsCount: activity.contractActivity,
    mwd: `${activity.monthActivity}/${activity.weekActivity}/${activity.dayActivity}`,
    witm,
    domain: domain ? <KeyboardArrowDownIcon color="success" /> : <RemoveIcon color="error" />,
    collapse: {
      address,
      balance: balance.tokens,
      transactions,
      contracts,
    },
    result,
  };
}
