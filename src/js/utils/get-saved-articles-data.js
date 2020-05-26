export default async function getSavedArticlesData(mainApi) {
  let data = [];
  try {
    data = await mainApi.getArticles();
  } catch (error) {
    data = [];
  }
  return data;
}
