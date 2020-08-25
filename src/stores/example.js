import { action, observable } from 'mobx';

export default class ExampleStore {
    @observable
    msg = '';

    @action
    setMsg(data) {
        this.msg = data;
    }
}
