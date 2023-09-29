export default async function getActivity(transList, ethPrice) {
  const arrActiveMonths = [];
  let activeWeeks = 0;
  let fee = 0;
  for (let trans of transList) {
    fee += trans.actual_fee;
    if (!arrActiveMonths.includes(trans.month)) {
      arrActiveMonths.push(trans.month);
      const arrCountOfWeeks = [];
      for (let tr of transList) {
        if (tr.month === trans.month && !arrCountOfWeeks.includes(tr.week)) {
          arrCountOfWeeks.push(tr.week);
        }
      }
      activeWeeks += arrCountOfWeeks.length;
    }
  }

  return {
    activeMonths: arrActiveMonths.length,
    activeWeeks,
    fee: '$' + (fee * ethPrice).toFixed(2),
  };
}
