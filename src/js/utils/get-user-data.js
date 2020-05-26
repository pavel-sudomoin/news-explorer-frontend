export default async function getUserData(mainApi) {
  const data = {};
  try {
    data.name = (await mainApi.getUserData()).name;
    data.auth = true;
  } catch (error) {
    data.name = undefined;
    data.auth = false;
  }
  return data;
}
