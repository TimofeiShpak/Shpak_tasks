import { observer } from 'mobx-react';

import store from '../../store/store';

const MessageList = observer(() => {
    let messageElements = store.messageList.getListElements();

    return (
        <div className="message-list-wrapper">
            <div className="message-list">
                {messageElements}
            </div>
        </div>
    );
})

export default MessageList;