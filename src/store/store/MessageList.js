import { makeAutoObservable, runInAction } from "mobx";

import api from '../../api/api';
import Message from '../../components/main/Message';
import MessageImg from '../../components/main/MessageImg';

class MessageList {
    messages = [];
    value = -1;
    constructor(main) {
        makeAutoObservable(this);
        this.main = main;
    };

    update(name) {
        api.messages.getMessages(name)
            .then((data) => {
                runInAction(() => this.messages = data);
            });
    }

    getMessages() {
        let index = this.main.channelData.index;
        let name = this.main.channelData.name;
        if (this.value !== index && name) {
            runInAction(() => this.value = index)
            this.update(name);
        }
        return this.messages;
    };

    getMessageElement(item, isNewDate, className) {
        return <Message 
            key={this.main.getId()}
            author={item.author} 
            time={item.time} 
            dataMessage={item.dataMessage}
            avatarSrc={item.avatarSrc}
            date={item.date}
            isNewDate={isNewDate}
            className={className}
        />
    }

    getListElements() {
        let data = this.getMessages();
        let date;
        let listElements = data.map((item) => { 
            let className = "message ";
            let isNewDate = false;
            if (date !== item.date) {
                isNewDate = true;
                date = item.date;
                className += "daily-messages";
            }
            return this.getMessageElement(item, isNewDate, className);
        });
        return listElements;
    }

    getMessageContent(dataMessage) {
        let messageContent = '';
        if (dataMessage) {
            messageContent = dataMessage.map((item) => {
                let elem;
                let key = this.main.getId();
                if (item.text) {
                    elem = <div key={key}>{item.text}</div>;
                } else if (item.img) {
                    elem = <MessageImg key={key} img={item.img} alt={item.text} />
                } else if (item.addressee) {
                    elem = <span key={key} className="message__addressee">{item.addressee} </span>;
                }
                return elem;
            });
        }
        return messageContent;
    }

    getDataMessageImg(props) {
        let dataLike = '😍 ' + props.img.likes;
        let className = "message__img";
        className += props.img.likes && " message__img_liked";
        return { dataLike, className };
    }
}

export default MessageList;