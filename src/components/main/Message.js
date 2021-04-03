import store from '../../mobx-multi/store';

function Message(props) {
    let { dataMessage, date, avatarSrc, time, author, className, isNewDate, userName } = props;
    let messageContent = store.messageList.getMessageContent(dataMessage);
    let authorOnClick = () => store.inputMessage.addAddressee(userName);

    return (
    <div>
        {isNewDate && <div className="message-date">{date}</div>}
        <div className={className}>
            <img alt={author} className="user-item__img" src={avatarSrc}></img>
            <div>
                <div className="message__info">
                    <div className="message__author" onClick={authorOnClick}>{author}</div>
                    <div className="message__time">{time}</div>
                </div>
                <div className="message__text">
                    {messageContent}
                </div>
            </div>
        </div>
    </div>
    );
}

export default Message;