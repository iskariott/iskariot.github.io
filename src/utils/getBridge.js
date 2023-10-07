export default function getBridge(transfers, prices) {
  let DepositTx = 0,
    WithdrawTx = 0;
  let DepositVolume = 0,
    WithdrawVolume = 0;

  transfers.forEach((transfer) => {
    const transfer_from_address = transfer.transfer_from_address;
    const transfer_to_address = transfer.transfer_to_address;
    const transfer_amount_display = transfer.transfer_amount_display;
    const from_erc20_identifier = transfer['from_erc20_identifier'];
    if (
      transfer_from_address.toLowerCase() ===
      '0x0000000000000000000000000000000000000000000000000000000000000000'.toLowerCase()
    ) {
      const selector_identifier = transfer['main_call']
        ? transfer['main_call']['selector_identifier']
        : null;
      if (selector_identifier === 'handle_deposit') {
        DepositTx += 1;
        DepositVolume += parseFloat(transfer_amount_display) * prices[from_erc20_identifier];
      }
    }
    if (
      transfer_to_address.toLowerCase() ===
      '0x0000000000000000000000000000000000000000000000000000000000000000'.toLowerCase()
    ) {
      const selector_identifier = transfer['main_call']
        ? transfer['main_call']['selector_identifier']
        : null;
      if (selector_identifier === 'initiate_withdraw') {
        WithdrawTx += 1;
        WithdrawVolume += parseFloat(transfer_amount_display) * prices[from_erc20_identifier];
      }
    }
  });
  return {
    DepositTx,
    WithdrawTx,
    DepositVolume: '$' + DepositVolume.toFixed(2),
    WithdrawVolume: '$' + WithdrawVolume.toFixed(2),
  };
}
