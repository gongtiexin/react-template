/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-6-12           gongtiexin       发布---订阅模式
 * */
export default class Event {
  // 缓存列表，存放订阅者回调函
  list = {};

  // 订阅
  listen = (key, fn) => {
    // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
    if (!this.list[key]) {
      this.list[key] = [];
    }
    // 订阅消息添加到缓存列表
    this.list[key].push(fn);
  };

  // 发布
  trigger = (...args) => {
    // 取出消息类型名称
    const key = Array.prototype.shift.call(args);
    // 取出该消息对应的回调函数的集合
    const fns = this.list[key];

    // 如果没有订阅过该消息的话，则返回
    if (!fns || fns.length === 0) {
      return;
    }

    fns.forEach(fn => fn(args));
  };

  remove = (key, fn) => {
    const fns = this.list[key];
    // 如果key对应的消息没有订阅过的话，则返回
    if (!fns) {
      return;
    }
    // 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
    if (!fn) {
      fns.length = 0;
    } else {
      // 删除订阅者的回调函数
      fns.forEach((_fn, idx) => {
        if (_fn === fn) {
          fns.splice(idx, 1);
        }
      });
    }
  };
}
