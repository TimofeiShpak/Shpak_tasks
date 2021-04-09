import { makeAutoObservable, runInAction } from "mobx";
import classNames from 'classnames';

import api from '../../api/api';
import ChannelItem from '../../components/navigation/ChannelItem';

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
            return <ChannelItem 
                key={this.main.getId()} 
                text={channel.name}
                index={index}
                className={className}
            />
        });
        return listElements;
    }

    getPath() {
        return this.path;
    }
}

export default ChannelData;