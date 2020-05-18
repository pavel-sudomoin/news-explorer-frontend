export default function createDomElementFromHtmlString(htmlCode) {
  const elem = document.createElement('div');
  elem.insertAdjacentHTML('beforeend', htmlCode);
  return elem.firstElementChild;
}
