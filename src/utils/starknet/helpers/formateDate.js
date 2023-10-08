export default function formateDate(timestamp) {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Note: Month is zero-based
  const year = String(date.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
}
