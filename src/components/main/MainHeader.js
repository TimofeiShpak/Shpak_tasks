import { observer } from 'mobx-react';

import Form from './Form';
import activeChannel from '../../store/activeChannel';
import channelList from '../../store/channelsList';

const MainHeader = observer(() => {
    let channel = channelList.list[activeChannel.index];
    
    return (
        <div className="main-header">
            <div className="main-header__topic">
                <div className="main-header__title">{`#${channel.text}`}</div>
                <button className="bookmark"></button>
            </div>
            <div className="main-header__content">
                <div className="number-subscribers">{channel.numberSubscribers}</div>
                <Form />
                <button className="notifications"></button>
                <button className="else-btn"></button>
            </div>
        </div>
    );
})

export default MainHeader;