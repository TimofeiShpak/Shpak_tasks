import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';
import ChannelItem from '../../components/navigation/ChannelItem';

const ChannelList = observer(() => {
    let dataList = store.channelData.getChannelsList();
    let elements = dataList.map((data) => {
        return <ChannelItem {...data} />
    });
    
    return (
        <div className="channels">
            <div className="navigation__title">
                Channels 
                <span className="number-channels">
                    {elements.length}
                </span>
            </div>
            <ul>
                {elements}
            </ul>
        </div>
    )
})

export default ChannelList;