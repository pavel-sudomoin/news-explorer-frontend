export default async function headerRefresh(header, mainApi) {
  try {
    const { name: userName } = await mainApi.getUserData();
    header.render({ isLoggedIn: true, userName });
  } catch (error) {
    header.render({ isLoggedIn: false });
  }
}
