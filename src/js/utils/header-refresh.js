export default function headerRefresh(header, userData) {
  if (userData.auth) {
    header.render({ isLoggedIn: true });
    header.render({ isLoggedIn: true, userName: userData.name });
  } else {
    header.render({ isLoggedIn: false });
  }
}
