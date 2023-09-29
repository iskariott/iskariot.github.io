export default function getThisMonthActivity(transList) {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const filteredTrans = transList.filter((tr) => tr.month === currentMonth);
  const arrActiveWeeks = [];
  for (let tr of filteredTrans) {
    if (!arrActiveWeeks.includes(tr.week)) arrActiveWeeks.push(tr.week);
  }
  return arrActiveWeeks.length;
}
