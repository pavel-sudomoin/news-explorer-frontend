export default function setArticlesState(articles = [], userData) {
  const { auth, articles: userAricles } = userData;
  articles.forEach((article) => {
    if (!auth) {
      article.renderIcon('unauth');
      return;
    }

    const { link } = article.getData();
    const userArticle = userAricles.find((target) => link === target.link);

    if (userArticle) {
      article.renderIcon('saved');
      article.setId(userArticle._id);
    } else {
      article.renderIcon('unsaved');
      article.setId(undefined);
    }
  });
}
