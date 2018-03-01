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
