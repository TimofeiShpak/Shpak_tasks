import { makeAutoObservable, runInAction } from "mobx";

import api from '../../api/api';
import ChannelItem from '../../components/navigation/ChannelItem';

class ChannelData {
    channels = [];
    index = 0;
    constructor(main) {
        makeAutoObservable(this);
        this.main = main;

        api.channels.getChannels()
            .then((data) => {
                runInAction(() => this.channels = data);
            });
    }

    get name() {
        let nameChannel = '';
        if (this.channels.length) {
            nameChannel = this.channels[this.index].name;
        }
        return nameChannel;
    }

    getChannelsList() {
        let activeIndex = this.index;
        let listElements = this.channels.map((channel, index) => {
            return <ChannelItem 
                key={this.main.getId()} 
                text={channel.name}
                index={index}
                active={activeIndex === index} 
            />
        });
        return listElements;
    }
}

export default ChannelData;