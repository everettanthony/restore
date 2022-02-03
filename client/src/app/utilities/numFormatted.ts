export default function numFormatted(num: number) {
  return '$' + (num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
