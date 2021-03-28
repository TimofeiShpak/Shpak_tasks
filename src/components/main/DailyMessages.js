import Message from './Message';

function DailyMessages(props) {
    const listElements = props.messagesData.map((item) => {
        return <Message 
                    key={item.id}
                    author={item.author} 
                    time={item.time} 
                    dataMessage={item.dataMessage}
                    avatarSrc={item.avatarSrc}
                />
    });
    return (
        <div className="daily-messages">
            <div className="message-date">{props.date}</div>
            {listElements}
        </div>
    );
}

export default DailyMessages;