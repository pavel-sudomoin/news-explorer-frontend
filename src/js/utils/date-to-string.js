export default function dateToString(publishedAt) {
  const date = new Date(publishedAt);
  return `${date.toLocaleString('ru', { day: 'numeric', month: 'long' })}, ${date.getFullYear()}`;
}
