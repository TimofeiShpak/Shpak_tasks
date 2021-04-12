import { makeAutoObservable, runInAction } from "mobx";
import classNames from 'classnames';

import api from '../../api/api';

class ChannelData {
    channels = [];
    index = 0;
    path = '/ ';
    
    constructor(main) {
        makeAutoObservable(this);
        this.main = main;

        api.channels.getChannels()
            .then((data) => {
                runInAction(() => this.channels = data);
            });
    }

    setIndex(value) {
        this.index = value;
        this.path = '/' + this.getName();
    }

    getName() {
        let nameChannel = '';
        if (this.channels.length) {
            nameChannel = this.channels[this.index].name;
        }
        return nameChannel;
    }

    getChannelsList() {
        let activeIndex = this.index;
        let listElements = this.channels.map((channel, index) => {
            let className = classNames({
                "channel-item": true,
                "channel-item_active" : activeIndex === index
            });
            let key = this.main.getId();
            return { key, text : channel.name, index, className }
        });
        return listElements;
    }

    getPath() {
        return this.path;
    }
}

export default ChannelData;