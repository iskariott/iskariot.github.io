export default function getVolume(transcations) {
  try {
    let volume = 0;
    const expect = ['transfer', 'deposit', 'handle_deposit', 'initiate_withdraw'];
    transcations.forEach((transaction) => {
      if (transaction.main_calls && expect.includes(transaction.main_calls[0]['selector_name'])) {
        return;
      }
      const transfers = transaction.transfers.sort(
        (a, b) => parseInt(b.total_value) - parseInt(a.total_value),
      );
      if (transfers.length === 0) return;
      const tmpVol = parseFloat(transfers[0].total_value);
      volume += tmpVol;
    });
    return '$' + volume.toFixed(2);
  } catch (e) {
    console.log('getVolume error: ', e);
    throw e;
  }
}
