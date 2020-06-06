export default function setArticleState({
  article,
  id = undefined,
  isSaved = false,
  isDeleted = false,
}) {
  if (isSaved) {
    article.renderIcon('saved');
    article.setId(id);
  } else if (isDeleted) {
    article.renderIcon('unsaved');
    article.setId(undefined);
  }
}
