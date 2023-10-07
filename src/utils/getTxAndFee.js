const getTxAndFee = (transcations, ethPrice) => {
  let fee = 0;
  transcations.forEach((transaction) => {
    fee += parseFloat(transaction['actual_fee_display']);
  });
  return {
    tx: transcations.length,
    fee: '$' + Number(fee * ethPrice).toFixed(2),
  };
};
export default getTxAndFee;
