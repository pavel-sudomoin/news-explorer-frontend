export default function setArticlesId(articles = [], userAricles) {
  articles.forEach((article) => {
    const { link } = article.getData();
    const userArticle = userAricles.find((target) => link === target.link);
    if (userArticle) article.setId(userArticle._id);
    else article.setId(undefined);
  });
}
