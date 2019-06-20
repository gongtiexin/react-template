class PubSub {
  topics = {};

  subUid = -1;

  subscribe = (topic, func) => {
    const token = (this.subUid += 1).toString();
    // 如果没有订阅过此类消息，创建一个缓存列表
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push({
      token,
      func,
    });
    return token;
  };

  unsubscribe = token => {
    Object.values(this.topics).forEach(value => {
      value.forEach((item, idx) => {
        if (item.token === token) {
          value.splice(idx, 1);
          console.log(`unsubscribe: ${token}`);
        }
      });
    });
  };

  publish = (topic, ...args) =>
    this.topics[topic]?.forEach(({ func }) => {
      func(args);
    });
}

// 一个简单的消息记录器，记录通过我们收到的任何主题和数据
const messageLogger = msg => {
  console.log(`Logging: ${msg}`);
};

const pubSub = new PubSub();

const subscription1 = pubSub.subscribe('friend1', messageLogger);
const subscription2 = pubSub.subscribe('friend2', messageLogger);

pubSub.publish('friend1', 'hello, friend1!');
pubSub.publish('friend2', 'hello, friend2!');

pubSub.unsubscribe(subscription1);

pubSub.publish('friend1', 'goodbye, friend1!');
pubSub.publish('friend2', 'goodbye, friend2!');

// console
// Logging: hello, friend1!
// Logging: hello, friend2!
// unsubscribe: 0
// Logging: goodbye, friend2!
