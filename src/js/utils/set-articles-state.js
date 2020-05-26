export default function setArticlesState(articles = [], serverData) {
  const { user: { auth }, articles: userAricles } = serverData;

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
