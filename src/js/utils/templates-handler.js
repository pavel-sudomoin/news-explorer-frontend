import createDomElementFromHtmlString from './create-dom-element-from-html-string';

export default function templatesHandler(templates) {
  return Object.fromEntries(
    Object.entries(templates).map(
      ([popupName, popupHTML]) => [popupName, createDomElementFromHtmlString(popupHTML)],
    ),
  );
}
