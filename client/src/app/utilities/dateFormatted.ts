export default function dateFormatted(dateStr: string) {
  return dateStr.split('T')[0].replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1');
}
