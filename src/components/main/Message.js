import store from '../../store/store';

function Message(props) {
    let messageContent = store.messageList.getMessageContent(props.dataMessage);
    let authorOnClick = store.inputMessage.addAddressee;

    return (
    <div>
        {props.isNewDate && <div className="message-date">{props.date}</div>}
        <div className={props.className} style={{backgroundImage:`url(${props.avatarSrc})`}}>
            <div className="message__info">
                <div className="message__author" onClick={() => authorOnClick(props.author)}>{props.author}</div>
                <div className="message__time">{props.time}</div>
            </div>
            <div className="message__text">
                {messageContent}
            </div>
        </div>
    </div>
    );
}

export default Message;