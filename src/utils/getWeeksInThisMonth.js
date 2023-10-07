function getWeekOfMonth(t) {
  const date = new Date(t);
  let adjustedDate = date.getDate() + date.getDay();
  let prefixes = ['0', '1', '2', '3', '4', '5'];
  return parseInt(prefixes[0 | (adjustedDate / 7)]) + 1;
}

export default function getWeeksInThisMonth(transList) {
  const currDate = new Date();
  const currMonth = currDate.getMonth() + 1;
  const filteredTrans = transList.filter((tr) => tr.date.slice(3, 5) === currMonth.toString());

  const arrActiveWeeks = new Set();
  for (let tr of filteredTrans) {
    const week = getWeekOfMonth(tr.timestamp);
    arrActiveWeeks.add(week);
  }
  return arrActiveWeeks.size;
}
