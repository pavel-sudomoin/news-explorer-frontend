export default async function getUserData(mainApi) {
  const data = {};
  try {
    data.name = (await mainApi.getUserData()).name;
    data.articles = await mainApi.getArticles();
    data.auth = true;
  } catch (error) {
    data.name = undefined;
    data.articles = [];
    data.auth = false;
  }
  return data;
}
