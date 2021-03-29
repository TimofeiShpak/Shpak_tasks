import { makeAutoObservable } from "mobx";

import channelList from './channelsList';

class ActiveChannel {
    constructor() {
        makeAutoObservable(this);
    }
    indexActiveChannel = 0;

    get index() {
        return this.indexActiveChannel;
    }

    set index(value) {
        this.indexActiveChannel = value;
    }

    get name() {
        return channelList.list[this.indexActiveChannel].text;
    }
}

export default new ActiveChannel();