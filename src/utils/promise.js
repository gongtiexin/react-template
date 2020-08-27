const PromiseStatusEnum = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
};

class MyPromise {
    constructor(executor) {
        this.status = PromiseStatusEnum.PENDING;
        this.value = null;
        this.reason = null;
        this.resolveQueue = [];
        this.rejectQueue = [];

        const resolve = (value) => {
            const run = () => {
                if (this.status === PromiseStatusEnum.PENDING) {
                    this.status = PromiseStatusEnum.FULFILLED;
                    this.value = value;

                    while (this.resolveQueue.length) {
                        const callback = this.resolveQueue.shift();
                        callback(value);
                    }
                }
            };

            setTimeout(run);
        };
        const reject = (error) => {
            const run = () => {
                if (this.status === PromiseStatusEnum.PENDING) {
                    this.status = PromiseStatusEnum.REJECTED;
                    this.reason = error;

                    while (this.rejectQueue.length) {
                        const callback = this.rejectQueue.shift();
                        callback(error);
                    }
                }
            };

            setTimeout(run);
        };

        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then = (onFulfilled, onRejected) => {
        return new MyPromise((resolve, reject) => {
            const resolveFn = (value) => {
                try {
                    const x = onFulfilled(value);
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                } catch (error) {
                    reject(error);
                }
            };

            const rejectFn = (error) => {
                try {
                    const x = onRejected(error);
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                } catch (error) {
                    reject(error);
                }
            };

            switch (this.status) {
                case PromiseStatusEnum.PENDING:
                    this.resolveQueue.push(resolveFn);
                    this.rejectQueue.push(rejectFn);
                    break;
                case PromiseStatusEnum.FULFILLED:
                    resolveFn(this.value);
                    break;
                case PromiseStatusEnum.REJECTED:
                    rejectFn(this.reason);
                    break;
            }
        });
    };

    catch = (onRejected) => this.then(undefined, onRejected);

    finally = (callback) =>
        this.then(
            (value) => MyPromise.resolve(callback()).then(() => value),
            (error) => MyPromise.resolve(callback()).then(() => MyPromise.reject(error))
        );

    static resolve = (value) =>
        new MyPromise((resolve, reject) =>
            value instanceof MyPromise ? value : new MyPromise((resolve, reject) => resolve(value))
        );

    static reject = (error) => new MyPromise((resolve, reject) => reject(error));

    // 静态all方法
    static all = (promiseArr) => {
        let count = 0;
        let result = [];
        return new MyPromise((resolve, reject) => {
            if (!promiseArr.length) {
                return resolve(result);
            }
            promiseArr.forEach((p, i) => {
                MyPromise.resolve(p).then(
                    (value) => {
                        count++;
                        result[i] = value;
                        if (count === promiseArr.length) {
                            resolve(result);
                        }
                    },
                    (error) => {
                        reject(error);
                    }
                );
            });
        });
    };

    // 静态race方法
    static race = (promiseArr) =>
        new MyPromise((resolve, reject) => {
            promiseArr.forEach((p) => {
                MyPromise.resolve(p).then(
                    (value) => {
                        resolve(value);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            });
        });
}

// const promise1 = new MyPromise((resolve, reject) => {
//     console.log(1);
//     resolve(2);
//     console.log(3);
//     reject(4);
// });
//
// const promise2 = new MyPromise((resolve, reject) => {
//     reject(5);
// });
//
// console.log(6);
//
// promise1.then(console.log, console.log);
// promise2.then(console.log, console.log);
