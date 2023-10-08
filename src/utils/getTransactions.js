import axios from 'axios';
import { getContracts } from './constants.js';
import formateDate from './formateDate.js';
import { getTransfers } from './getTransfers.js';

const getContractNames = (transactions, ethPrice) => {
  const contracts = getContracts();
  let domain = false;
  transactions.forEach((t) => {
    t.date = formateDate(t.timestamp);
    t.fee = (Number(t.actual_fee_display) * ethPrice).toFixed(2);
    if (!t.main_calls) return;
    for (let i = 0; i < t.main_calls.length; i++) {
      const calls = t.main_calls[i];
      if (calls.selector_identifier === 'approve') continue;
      if (calls.selector_name === 'claim_name') {
        t.contract_name = 'Domain';
        domain = true;
        break;
      }
      if (calls.selector_name === 'constructor') {
        t.contract_name = 'Deploy account';
        break;
      }
      if (calls.selector_name === 'upgrade') {
        t.contract_name = 'Upgrade';
        break;
      }
      if (calls.selector_identifier === 'transfer') {
        t.contract_name = 'Transfer';
        break;
      }
      t.contract_name = calls.contract_identifier;
      break;
    }
    const idx = contracts.findIndex((c) => c.name === t.contract_name);
    if (idx !== -1) {
      contracts[idx].count += 1;
    }
  });
  return { contracts, domain };
};

async function fetchTransactions(url, Json_data, headers) {
  const response = await axios.post(url, Json_data, { headers: headers });
  let transactions = [];
  response.data.data['transactions']['edges'].forEach((item) => {
    const {
      actual_fee_display,
      // nonce,
      calldata,
      main_calls,
      timestamp,
      transaction_hash,
    } = item['node'];
    transactions.push({
      actual_fee_display,
      calldata,
      main_calls,
      timestamp,
      transaction_hash,
      contract_name: '-',
      transfers: [],
    });
  });
  return {
    transactions: transactions,
    hasNextPage: response.data.data['transactions']['pageInfo']['hasNextPage'],
    endCursor: response.data.data['transactions']['pageInfo']['endCursor'],
  };
}

export default async function getTransactions(address, prices) {
  const url = 'https://starkscan.stellate.sh/';
  const headers = {
    'authority': 'starkscan.stellate.sh',
    'accept-language': 'q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  };
  const Json_data = {
    'query':
      'query TransactionsTableQuery(\n  $first: Int!\n  $after: String\n  $input: TransactionsInput!\n) {\n  ...TransactionsTablePaginationFragment_transactions_2DAjA4\n}\n\nfragment TransactionsTableExpandedItemFragment_transaction on Transaction {\n  entry_point_selector_name\n  calldata_decoded\n  entry_point_selector\n  calldata\n  initiator_address\n  initiator_identifier\n actual_fee\n  actual_fee_display\n main_calls {\n    selector\n    selector_name\n    calldata_decoded\n    selector_identifier\n    calldata\n    contract_address\n    contract_identifier\n    id\n  }\n}\n\nfragment TransactionsTablePaginationFragment_transactions_2DAjA4 on Query {\n  transactions(first: $first, after: $after, input: $input) {\n    edges {\n      node {\n        id\n        ...TransactionsTableRowFragment_transaction\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment TransactionsTableRowFragment_transaction on Transaction {\n  id\n  transaction_hash\n  block_number\n  transaction_status\n  transaction_type\n  timestamp\n  nonce\n contract_address\n  contract_identifier\n sender_address\n  sender_identifier\n initiator_address\n  initiator_identifier\n  initiator {\n    is_social_verified\n    id\n  }\n  main_calls {\n    selector_identifier\n    id\n  }\n  ...TransactionsTableExpandedItemFragment_transaction\n}\n',
    'variables': {
      'first': 100,
      'after': null,
      'input': {
        'initiator_address': address,
        'sort_by': 'timestamp',
        'order_by': 'desc',
        'min_block_number': null,
        'max_block_number': null,
        'min_timestamp': null,
        'max_timestamp': null,
      },
    },
  };
  try {
    let allTransactions = [];
    let results = await fetchTransactions(url, Json_data, headers);
    allTransactions.push(...results.transactions);
    while (results.hasNextPage) {
      Json_data['variables']['after'] = results.endCursor;
      results = await fetchTransactions(url, Json_data, headers);
      allTransactions.push(...results.transactions);
    }

    const { contracts, domain } = getContractNames(allTransactions, prices['StarkGate: ETH']);

    const transfers = await getTransfers(address, prices);
    transfers.forEach((transfer) => {
      allTransactions.forEach((transaction) => {
        if (transfer['transaction_hash'] === transaction['transaction_hash']) {
          transaction['transfers'].push(transfer);
        }
      });
    });
    return { transfers, transactions: allTransactions, contracts, domain };
  } catch (e) {
    console.log('getTransactions error: ', e);
    throw e;
  }
}
