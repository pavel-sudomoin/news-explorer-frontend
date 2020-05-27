export default function findArticleIndexById(articles, id) {
  return articles.findIndex((item) => item._id === id);
}
