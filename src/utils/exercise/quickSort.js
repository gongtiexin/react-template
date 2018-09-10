/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-9-10           gongtiexin       快排
 * */

const arr = [1, 4, 5, 2, 6, 3, 9, 8, 0, 7];
// 原地交换函数，而非用临时数组
const swap = (array, a, b) => ([array[a], array[b]] = [array[b], array[a]]);

// 比较函数
const compare = (a, b) => {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
};

// 划分操作函数
const partition = (array, left, right) => {
  // 用index取中间值而非splice
  const pivot = array[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    while (compare(array[i], pivot) === -1) {
      i += 1;
    }
    while (compare(array[j], pivot) === 1) {
      j -= 1;
    }
    if (i <= j) {
      swap(array, i, j);
      i += 1;
      j -= 1;
    }
  }
  return i;
};

const quick = (array, left, right) => {
  let index;
  if (array.length > 1) {
    index = partition(array, left, right);
    if (left < index - 1) {
      quick(array, left, index - 1);
    }
    if (index < right) {
      quick(array, index, right);
    }
  }
  return array;
};

const quickSort = array => quick(array, 0, array.length - 1);
console.log(quickSort(arr));
