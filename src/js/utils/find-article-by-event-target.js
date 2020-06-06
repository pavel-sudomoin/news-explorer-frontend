export default function findArticleByEventTarget(newsCardList, target) {
  return newsCardList.getArticles().find((article) => article.getContent().contains(target));
}
