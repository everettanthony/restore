export default function totalsNumFormatted(num: number) {
  return '$' + (num/100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}