const isStraight = arr => {
  // 省略 j q k 鬼 => 11 12 13 14
  arr.sort((a, b) => a - b);
  const notGhost = arr.filter(num => num !== 14);

  if ([...new Set(notGhost)].length === arr.length) {
    return "no";
  }

  const length = notGhost[notGhost.length - 1] - notGhost[0] + 1;
  return length > arr.length ? "no" : "yes";
};
