export const CONTRACTS = `[{"address":"0x03090623ea32d932ca1236595076b00702e7d860696faf300ca9eb13bfe0a78c","name":"aspect","url":"https://aspect.co/"},
  {"address":"0x05dbdedc203e92749e2e746e2d40a768d966bd243df04a6b712e222bc040a9af","name":"starknetid","url":"https://app.starknet.id/"},
  {"address":"0x6ac597f8116f886fa1c97a23fa4e08299975ecaf6b598873ca6792b9bbfb678","name":"starknetid","url":"https://app.starknet.id/"},
  {"address":"0x04942ebdc9fc996a42adb4a825e9070737fe68cef32a64a616ba5528d457812e","name":"starknetid","url":"https://app.starknet.id/"},
  {"address":"0x04942ebdc9fc996a42adb4a825e9070737fe68cef32a64a616ba5528d457812e","name":"mintsquare","url":"https://mintsquare.io/"},
  {"address":"0x041fd22b238fa21cfcf5dd45a8548974d8263b3a531a60388411c5e230f97023","name":"jediswap","url":"https://www.jediswap.xyz/"},
  {"address":"0x07e2a13b40fc1119ec55e0bcf9428eedaa581ab3c924561ad4e955f95da63138","name":"jediswap","url":"https://www.jediswap.xyz/"},
  {"address":"0x04d0390b777b424e43839cd1e744799f3de6c176c7e32c1812a41dbd9c19db6a","name":"jediswap","url":"https://www.jediswap.xyz/"},
  {"address":"0x07a6f98c03379b9513ca84cca1373ff452a7462a3b61598f0af5bb27ad7f76d1","name":"10kswap","url":"https://10kswap.com/"},
  {"address":"0x070f8a4fcd75190661ca09a7300b7c93fab93971b67ea712c664d7948a8a54c6","name":"nostra","url":"https://nostra.finance/"},
  {"address":"0x04270219d365d6b017231b52e92b3fb5d7c8378b05e9abc97724537a80e93b0f","name":"avnu","url":"https://www.avnu.fi/"},
  {"address":"0x028c858a586fa12123a1ccb337a0a3b369281f91ea00544d0c086524b759f627","name":"sithswap","url":"https://sithswap.com/"},
  {"address":"0x010884171baf1914edc28d7afb619b40a4051cfae78a094a55d230f19e944a28","name":"myswap","url":"https://www.myswap.xyz/"},
  {"address":"0x01b23ed400b210766111ba5b1e63e33922c6ba0c45e6ad56ce112e5f4c578e62","name":"fibrous.finance","url":"https://fibrous.finance/"},
  {"address":"0x03201e8057a781dca378564b9d3bbe9b5b7617fac4ad9d9deaa1024cf63f877e","name":"fibrous.finance","url":"https://fibrous.finance/"},
  {"address":"0x04c0a5193d58f74fbace4b74dcf65481e734ed1714121bdc571da345540efa05","name":"zklend","url":"https://zklend.com/"},
  {"address":"0x064a24243f2aabae8d2148fa878276e6e6e452e3941b417f3c33b1649ea83e11","name":"orbiter","url":"https://www.orbiter.finance/"},
  {"address":"0x0454f0bd015e730e5adbb4f080b075fdbf55654ff41ee336203aa2e1ac4d4309","name":"dmail","url":"https://dmail.ai/"}]`;

export const STABLES = ['USDT', 'USDC', 'DAI'];

export const Months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

export const Columns = [
  { id: 'id', label: '№', align: 'center', padding: '16px 5px' },
  { id: 'label', label: '#', align: 'center' },
  { id: 'address', label: 'address', align: 'center' },
  {
    id: 'totalBalance',
    label: 'Balance',
    align: 'center',
  },
  {
    id: 'ETH',
    label: 'USDC',
    align: 'center',
  },
  {
    id: 'USDC',
    label: 'USDC',
    align: 'center',
  },
  {
    id: 'USDT',
    label: 'USDT',
    align: 'center',
  },
  {
    id: 'bridge to/from',
    label: 'Bridge to/from',
    align: 'center',
  },
  {
    id: 'volume',
    label: 'Volume',
    align: 'center',
  },
  {
    id: 'txsCount',
    label: 'Txs',
    align: 'center',
  },
  {
    id: 'uniqueContracts',
    label: 'Contracts',
    align: 'center',
  },
  {
    id: 'mwd',
    label: 'M/W/D',
    align: 'center',
  },
  {
    id: 'witm',
    label: 'WITM',
    hint: 'Active weeks in this month',
    align: 'center',
  },
  {
    id: 'totalFee',
    label: 'Gus burned',
    align: 'center',
  },
  { id: 'update', label: '', align: 'center', padding: '16px 6px' },
];
