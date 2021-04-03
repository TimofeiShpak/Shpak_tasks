import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';


const ChannelList = observer(() => {
    let listElements = store.channelData.getChannelsList();
    return (
        <div className="channels">
            <div className="navigation__title">
                Channels 
                <span className="number-channels">
                    {listElements.length}
                </span>
            </div>
            <ul>
                {listElements}
            </ul>
        </div>
    )
})

export default ChannelList;