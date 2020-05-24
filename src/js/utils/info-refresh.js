export default function infoRefresh(info, userData) {
  if (!userData.auth) return;

  const stringWithAmount = `${userData.name}, у вас ${userData.articles.length} сохранённых статей`;

  let stringWithKeys = 'тест';

  const keysObj = {};
  userData.articles.forEach((article) => {
    const key = article.keyword;
    keysObj[key] = keysObj[key] + 1 || 1;
  });

  let keysArr = Object.entries(keysObj);
  const keysAmount = keysArr.length;

  if (keysAmount <= 3) {
    keysArr.sort((a, b) => b[1] - a[1]);
    keysArr = keysArr.map((key) => key[0]);
    if (keysAmount === 0) stringWithKeys = 'ключевые слова не найдены';
    else if (keysAmount === 1) stringWithKeys = `${keysArr[0]}`;
    else if (keysAmount === 2) stringWithKeys = `${keysArr[0]} и ${keysArr[1]}`;
    else if (keysAmount === 3) stringWithKeys = `${keysArr[0]}, ${keysArr[1]} и ${keysArr[2]}`;
  } else {
    let firstKey = ['', 0];
    let secondKey = firstKey.slice();
    keysArr.forEach((currentKey) => {
      if (currentKey[1] > firstKey[1]) {
        secondKey = firstKey;
        firstKey = currentKey;
      } else if (currentKey[1] > secondKey[1]) {
        secondKey = currentKey;
      }
    });
    stringWithKeys = `${firstKey[0]}, ${secondKey[0]} и ${keysAmount - 2} другим`;
  }

  info.render(stringWithAmount, stringWithKeys);
}
