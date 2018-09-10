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

/**
 * 双向绑定
 * */
// Dep
class Dep {
  sub = [];

  addSub = watcher => this.sub.push(watcher);

  notify = () => this.sub.forEach(watcher => watcher.fn());
}

// class Dep {
//   constructor() {
//     this.sub = [];
//     this.addSub = this.addSub.bind(this);
//     this.notify = this.notify.bind(this);
//   }
//   // sub = [];
//   addSub(watcher) {
//     this.sub.push(watcher);
//   }
//   notify() {
//     this.sub.forEach(watcher => {
//       watcher.fn();
//     });
//   }
// }

// Observer
class Observer {
  constructor(obj, key, value) {
    const dep = new Dep();
    let backup = value;
    // if (Object.prototype.toString.call(backup) === "[object Object]") {
    //   Object.entries(backup).forEach(([k, v]) => Observer(backup, k, v));
    // }
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        if (Dep.target) {
          // 存储依赖
          dep.addSub(Dep.target);
        }
        console.log("get");
        return backup;
      },
      set(newVal) {
        if (backup === newVal) return;
        backup = newVal;
        // 执行依赖
        dep.notify();
        console.log("set");
      },
    });
  }
}

// Watcher
class Watcher {
  constructor(data, k, fn) {
    this.fn = fn;
    Dep.target = this;
    data[k];
    Dep.target = null;
  }
}

const observable = obj => {
  if (Object.prototype.toString.call(obj) === "[object Object]") {
    Object.entries(obj).forEach(([key, value]) => {
      if (Object.prototype.toString.call(value) === "[object Object]") {
        observable(value);
      }
      new Observer(obj, key, value);
      new Watcher(obj, key, (v, key) => {
        console.log("你修改了数据");
        // document.getElementById('dd').innerHTML=v.key;
      });
    });
  }
};

const point = { x: 1, y: 2, option: { color: "#eee" } };
observable(point);

/**
 * 快排
 * */
const arr = [1, 4, 5, 2, 6, 3, 9, 8, 0, 7];
// 原地交换函数，而非用临时数组
function swap(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]];
}

// 比较函数
function compare(a, b) {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
}

// 划分操作函数
function partition(array, left, right) {
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
}

function quick(array, left, right) {
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
}

function quickSort(array) {
  return quick(array, 0, array.length - 1);
}
console.log(quickSort(arr));
