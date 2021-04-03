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
        let name = this.main.channelData.getName();
        if (this.value !== index && name) {
            runInAction(() => this.value = index)
            this.update(name);
        }
        return this.messages;
    };

    getDate() {
        let currentDate = new Date();
        let today = new Date().toLocaleDateString();
        currentDate.setDate(currentDate.getDate() - 1);
        let yesterday = currentDate.toLocaleDateString();
        return {today, yesterday};
    }

    checkDate(item, date, today, yesterday) {
        let isNewDate = false;
        let className = this.main.classNames({
            "message": true,
            "daily-messages" : date !== item.date
        });
        let dateMessage = item.date;
        if (date !== item.date) {
            isNewDate = true;
            if (item.date === today) {
                dateMessage = "Today";
            } else if(item.date === yesterday) {
                dateMessage = "Yesterday";
            }
        }
        return {isNewDate, className, dateMessage};
    }

    getMessageElement(item, isNewDate, className, date) {
        return ( 
            <Message 
                key={this.main.getId()}
                author={item.author} 
                time={item.time} 
                dataMessage={item.dataMessage}
                avatarSrc={item.avatarSrc}
                date={date}
                isNewDate={isNewDate}
                className={className}
                userName={item.userName}
            />
        );
    }

    getListElements() {
        let { today, yesterday } = this.getDate();
        let data = this.getMessages();
        let date;
        let listElements = data.map((item) => { 
            let { isNewDate, className, dateMessage } = this.checkDate(item, date, today, yesterday);
            date = item.date;
            return this.getMessageElement(item, isNewDate, className, dateMessage);
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
        let className = this.main.classNames({
            "message__img": true,
            "message__img_liked" : props.img.likes
        });
        return { dataLike, className };
    }
}

export default MessageList;