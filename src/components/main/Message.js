import store from '../../mobx-multi/store';

function Message(props) {
    let { date, className, isNewDate, data : { avatarSrc, time, author, userName, id,
        addressee, text, idUser, idAddressee } } = props;

    let handleClick = (event) => store.message.handleClick(event, id, userName, idUser, idAddressee);
    let buttonsEdit = store.message.getButtonsEdit(id, idUser);

    return (
        <div className="message-wrapper" onClick={handleClick} >
            {isNewDate && (
                    <div className="message-date">
                        <div className="message-date__border"></div>
                        <div className="message-date__item">
                            {date}
                        </div>
                        <div className="message-date__border"></div>
                    </div>                    
                )
            }
            <div className={className}>
                <img 
                    alt={author} 
                    className="user-item__img" 
                    src={avatarSrc} 
                />
                <div className="message__content">
                    <div className="message__info">
                        <div className="message__author" >
                                {author}
                        </div>
                        <div className="message__time">{time}</div>
                        {buttonsEdit}
                    </div>
                    <div className="message__text-wrapper">
                    <span className="message__addressee">
                        {addressee}
                    </span>
                    <div className="message__text">{text}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;