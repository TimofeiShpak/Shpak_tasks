import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';
import MessageButtons from './MessageButtons';

const Message = observer((props) => {
    let { date, className, isNewDate, data : { avatarSrc, time, author, userName, id,
        addressee, text, idUser, idAddressee, isEdit } } = props;

    let handleClick = (event) => store.message.handleClick(event, id, userName, idUser, idAddressee);

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
                        <div>{time}</div>
                        {isEdit && <div>edited</div>}
                        <MessageButtons id={id} idUser={idUser} />
                    </div>
                    <div className="message__text-wrapper">
                    <span className="message__addressee">
                        {addressee}
                    </span>
                    <div className="message__text">{text.trim()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default Message;