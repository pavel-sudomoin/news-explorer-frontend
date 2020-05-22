import NewsCard from '../../blocks/article/news-card';
import { ARTICLE_SAVEDPAGE_CONTENT } from '../constants/templates';

export default function savedArticlesRefresh(newsCardList, userData) {
  newsCardList.open();
  if (!userData.auth || userData.articles.length === 0) {
    newsCardList.renderError();
    return;
  }
  const articles = userData.articles.map(
    (data) => new NewsCard(ARTICLE_SAVEDPAGE_CONTENT.cloneNode(true), data),
  );
  newsCardList.renderResults(articles, 'all');
}
