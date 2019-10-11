// class LazyMan {
//   constructor(name) {
//     this.taskList = [];
//     this.name = name;
//     console.log(`Hi I am ${name}`);
//     setTimeout(() => {
//       this.next();
//     }, 0);
//   }
//
//   sleepFirst = second => {
//     const fn = () => {
//       setTimeout(() => {
//         console.log(`等待了${second}秒`);
//         this.next();
//       }, second * 1000);
//     };
//     this.taskList.unshift(fn);
//     return this;
//   };
//
//   sleep = second => {
//     const fn = () => {
//       setTimeout(() => {
//         console.log(`等待了${second}秒`);
//         this.next();
//       }, second * 1000);
//     };
//     this.taskList.push(fn);
//     return this;
//   };
//
//   eat = food => {
//     const fn = () => {
//       console.log(food);
//       this.next();
//     };
//     this.taskList.push(fn);
//     return this;
//   };
//
//   next = () => {
//     const fn = this.taskList.shift();
//     if (fn) {
//       fn();
//     }
//   };
// }
//
// const getArr = (n = 10) => new Array(n).fill(0).map(_ => Math.floor(Math.random() * 100));
//
// const computedArr = () => {
//   const arr = [];
//   getArr().forEach(item => {
//     const idx = Math.floor(item / 10);
//     if (arr[idx]) {
//       arr[idx].push(item);
//     } else {
//       arr[idx] = [item];
//     }
//   });
//   return arr;
// };
//
// new LazyMan('Tony')
//   .eat('lunch')
//   .eat('dinner')
//   .sleepFirst(5)
//   .sleep(4)
//   .eat('junk food');
//
// const f2 = (arr, str) => {
//   const newArr = Array.isArray(str) ? str : JSON.parse(str.replace(/([a-z]+)/g, '"$1"'));
//   const obj = {};
//   newArr.forEach((item, idx) => {
//     obj[item] = Array.isArray(arr[idx]) ? Object.assign(obj, f2(arr[idx], item)) : arr[idx];
//   });
//   console.log(obj);
//   return obj;
// };
//
// f2([1, [2, [4]], 3], '[a,[b,[d,e]],c]');
// // {a: 1, b: 2, d: 4, e: undefined, c: 3}
//
// const f3 = (nums = [2, 7, 11, 15], target = 9) => {
//   nums.forEach((item, index) => {
//     const targetIndex = nums.findIndex(num => num + item === target);
//     if (targetIndex !== -1) {
//       console.log(index, targetIndex);
//     }
//   });
// };
//
// f3();
//
// const a = [
//   { id: 1, name: '部门A', parentId: 0 },
//   { id: 2, name: '部门B', parentId: 0 },
//   { id: 3, name: '部门C', parentId: 1 },
//   { id: 4, name: '部门D', parentId: 1 },
//   { id: 5, name: '部门E', parentId: 2 },
//   { id: 6, name: '部门F', parentId: 3 },
//   { id: 7, name: '部门G', parentId: 2 },
//   { id: 8, name: '部门H', parentId: 4 },
// ];
//
// const f4 = (root, arr) => {
//   return root.map(item => {
//     const children = arr.filter(child => child.parentId === item.id);
//     if (children.length !== 0) {
//       Object.assign(item, { children: f4(children, arr) });
//     }
//     return item;
//   });
// };
//
// console.log(f4(a.filter(item => item.parentId === 0), a));
//
// const removeElement = (nums, val) => {
//   for (let i = 0; i < nums.length; i += 1) {
//     if (nums[i] === val) {
//       nums.splice(i, 1);
//       i -= 1;
//     }
//   }
//   return nums.length;
// };
//
// const arr = [3, 2, 2, 3];
// console.log(removeElement(arr, 3), arr);
//
// class PubSub {
//   topics = {};
//
//   subId = 0;
//
//   subscribe = (topic, func) => {
//     const token = (this.subId += 1).toString();
//     if (this.topics[topic]) {
//       this.topics[topic].push({ token, func });
//     } else {
//       this.topics[topic] = [{ token, func }];
//     }
//     return { topic, token };
//   };
//
//   unSubscribe = ({ topic, token }) => {
//     const idx = this.topics[topic].findIndex(item => item.token === token);
//     this.topics[topic].splice(idx, 1);
//   };
//
//   publish = (topic, ...args) => {
//     this.topics[topic]?.forEach(subscribe => subscribe.func(args));
//   };
// }
//
// const pubSub = new PubSub();
// const logHandler = msg => console.log(`log:${msg}`);
//
// const subscription1 = pubSub.subscribe('topic1', logHandler);
// const subscription2 = pubSub.subscribe('topic2', logHandler);
//
// pubSub.publish('topic1', 'hello topic1');
// pubSub.publish('topic2', 'hello topic2');
// pubSub.unSubscribe(subscription1);
// pubSub.publish('topic1', 'hello topic1');
// pubSub.publish('topic2', 'hello topic2');

class A {
  constructor(a) {
    this.a = a;
  }
}

class B extends A {
  constructor(b) {
    super('a');
    this.b = b;
  }
}

console.log(new B('b').c);
console.log(Object.getPrototypeOf(new B('b')));

function C() {}

function D() {
  C.call(this);
}
(function() {
  const Super = function() {};
  Super.prototype = C.prototype;
  D.prototype = new Super();
})();
