export function replaceItem(items, [targetIdx, sourceIdx]) {
  console.log("--- items");
  console.log(items);
  console.log(`target: ${targetIdx}, source: ${sourceIdx}`);

  const targetedItem = findItemByIdx(items, targetIdx);
  console.log("--- targeted item");
  console.log(targetedItem);

  const filteredItems = filterGraph(items, targetIdx);
  console.log("--- filtered items");
  console.log(filteredItems);

  const itemsWithItemAppended = appendItem(
    filteredItems,
    targetedItem,
    sourceIdx
  );
  console.log("--- concated items ");
  console.log(itemsWithItemAppended);

  const indexedItems = appendIdex(itemsWithItemAppended);
  return indexedItems;
}

function appendItem(items, item, idx) {
  return items.reduce(function replaceItems(acc, curr) {
    const isObj = !Array.isArray(curr);
    if (isObj && curr.idx == idx) return [...acc, curr, item];
    return [...acc, isObj ? curr : appendItem(curr, item, idx)];
  }, []);
}

function findLastIndex(item) {
  const isObj = !Array.isArray(item);
  if (isObj) return item.idx;
  return findLastIndex(item[item.length - 1]);
}

export function appendIdex(currArr, updatedArr = [], i = 0) {
  const [currEl, ...rest] = currArr;
  const isNoMoreItems = !currEl;

  if (isNoMoreItems) return updatedArr;

  const nextElement = Array.isArray(currEl)
    ? appendIdex(currEl, [], i)
    : { ...currEl, idx: i };

  const nextI = findLastIndex(nextElement) + 1;

  return appendIdex(rest, [...updatedArr, nextElement], nextI);
}

function findItemByIdx([curr, ...rest], idx) {
  const isNoMoreItems = !curr;
  if (isNoMoreItems) return;

  const isObj = !Array.isArray(curr);
  const item = isObj ? curr : findItemByIdx(curr, idx);

  if (item && item.idx == idx) return item;
  return findItemByIdx(rest, idx);
}

function filterGraph(items, idx) {
  return items.reduce(function concatSelectively(acc, curr) {
    const isObj = !Array.isArray(curr);
    if (isObj && curr.idx == idx) return acc;
    return [...acc, isObj ? curr : filterGraph(curr, idx)];
  }, []);
}
