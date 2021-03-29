import { observer } from 'mobx-react';

import ChannelItem from './ChannelItem';
import channelList from '../../store/channelsList';
import activeChannel from '../../store/activeChannel';

const ChannelList = observer(() => {
    const listElements = channelList.list.map((item, index) => {
        return <ChannelItem 
                    key={item.id} 
                    text={item.text} 
                    index={index}
                    activeChannel={activeChannel}
                    active={index === activeChannel.index ? true : false}
                />
    });
    return (
        <div className="channels">
            <div className="navigation__title">Channels <span className="number-channels">{listElements.length}</span></div>
            <ul>
                {listElements}
            </ul>
        </div>
    )
})

export default ChannelList;