// export default function getWeekOfMonth(date) {
//   var month = date.getMonth(),
//     year = date.getFullYear(),
//     firstWeekday = new Date(year, month, 1).getDay(),
//     lastDateOfMonth = new Date(year, month + 1, 0).getDate(),
//     offsetDate = date.getDate() + firstWeekday - 1,
//     index = 1, // start index at 0 or 1, your choice
//     weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7),
//     week = index + Math.floor(offsetDate / 7);
//   if (week < 2 + index) return week;
//   return week === weeksInMonth ? index + 5 : week;
// }

export default function getWeekOfMonth(date) {
  let adjustedDate = date.getDate() + date.getDay();
  let prefixes = ['0', '1', '2', '3', '4', '5'];
  return parseInt(prefixes[0 | (adjustedDate / 7)]) + 1;
}
