export default class PubSub {
  state = null;

  subscriptions = [];

  publish() {
    this.subscriptions.forEach((subscription) => subscription());
  }

  subscribe(subscription) {
    this.subscriptions.push(subscription);
  }

  unSubscribe(subscription) {
    const index = this.subscriptions.findIndex((item) => item === subscription);
    if (index > -1) {
      this.subscriptions.splice(index, 1);
    }
  }
}
