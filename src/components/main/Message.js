import MessageImg from './MessageImg';

function Message(props) {
    let messageContent = props.dataMessage.map((item) => {
        if (item.text) {
            return <div key={item.text}>{item.text}</div>;
        } else if (item.link) {
            return <a href="" key={item.link} className="message__link">{item.link}</a>;
        } else if (item.img) {
            return <MessageImg key={item.img} img={item.img}/>
           
        } else if (item.addressee) {
            return <span key={item.addressee} className="message__addressee">{item.addressee} </span>;
        }
    });

    return (
        <div className="message" style={{backgroundImage:`url(${props.avatarSrc})`}}>
            <div className="message__info">
                <div className="message__author">{props.author}</div>
                <div className="message__time">{props.time}</div>
            </div>
            <div className="message__text">
                {messageContent}
            </div>
        </div>
    );
}

export default Message;