const TopicsEnum = {};

class PubSub {
  topics = {};

  subId = -1;

  subscribe = (topic, func) => {
    const token = (this.subId += 1).toString();
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push({ token, func });
    console.log(
      `subscribe topic:${topic} subId:${token} desc:${TopicsEnum.properties[topic]?.desc}`
    );
    return { topic, token };
  };

  unSubscribe = ({ topic, token }) => {
    if (!topic || !this.topics[topic]) {
      return;
    }
    const idx = this.topics[topic].findIndex((subscription) => subscription.token === token);
    this.topics[topic].splice(idx, 1);
    console.log(
      `ubSubscribe topic:${topic} subId:${token} desc:${TopicsEnum.properties[topic]?.desc}`
    );
  };

  publish = (topic, ...args) =>
    this.topics[topic]?.forEach((subscription) => subscription.func(...args));
}

const pubSub = new PubSub();

export default pubSub;

export { TopicsEnum };

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
