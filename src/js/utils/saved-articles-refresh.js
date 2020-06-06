import NewsCard from '../../blocks/article/news-card';
import { ARTICLE_SAVEDPAGE_CONTENT } from '../constants/templates';

export default function savedArticlesRefresh(newsCardList, serverData) {
  const { user: { auth }, articles: userAricles } = serverData;
  newsCardList.open();
  if (!auth || userAricles.length === 0) {
    newsCardList.renderError();
    return;
  }
  const articles = userAricles.map(
    (data) => new NewsCard(ARTICLE_SAVEDPAGE_CONTENT.cloneNode(true), data),
  );
  newsCardList.renderResults(articles, 'all');
}
