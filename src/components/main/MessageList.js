import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';
import Message from './Message';

const MessageList = observer(() => {
    let messageElementsData = store.messageList.getListElementsData();
    let messageElements = messageElementsData.map((data) => {
        return <Message key={data.id} {...data} />;
    });

    return (
        <div className="message-list-wrapper">
            <div className="message-list">
                {messageElements}
            </div>
        </div>
    );
})

export default MessageList;