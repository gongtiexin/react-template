// function A(str) {
//     this.a = 'a';
//     this.obj = { a: str };
// }
//
// function B() {
//     this.b = 'b';
// }
//
// // new
// const MyNew = (constructor, ...rest) => {
//     const obj = Object.create(constructor.prototype, {});
//     constructor.apply(obj, rest);
//     return obj;
// };
//
// console.log('new', MyNew(A) instanceof A);

// extend

// prototype
// B.prototype = new A();
// B.prototype.constructor = B;
// const obj1 = new B();
// const obj2 = new B();
// console.log(obj1.obj);
// obj2.obj.a = 'a1';
// console.log(obj1.obj);
// console.log(obj2.obj);

// constructor
// const ob1 = new B();
// A.call(ob1);
// console.log(ob1);

// function A() {
//     this.a = 'a';
// }
//
// function B() {
//     A.call(this);
//     this.b = 'b';
// }
//
// const prototype = Object.create(A.prototype);
// // prototype.constructor = B;
// B.prototype = prototype;

function fn(a, b = 10) {
  arguments[0] = 10;
  console.log(a);
}

fn(1, 10);

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  const dfs = (arr, data) => {
    if (arr.length === 0) {
      res.push([...data]);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === arr[i - 1]) {
        continue;
      }

      data.push(arr.splice(i, 1)[0]);
      dfs(arr, data);
      arr.splice(i, 0, data.pop());
    }
  };
  dfs(nums, []);
  return res;
};

console.log(permuteUnique([1, 1, 2]));
