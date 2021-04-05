import { makeAutoObservable, runInAction } from "mobx";
import classNames from 'classnames';

import api from '../../api/api';
import Message from '../../components/main/Message';

class MessageList {
    messages = [];
    value = -1;

    constructor(main) {
        makeAutoObservable(this);
        this.main = main;
    };

    update(name) {
        api.messages.getMessages(name)
            .then((data) => this.setData(data))
    }

    setData(data) {
        runInAction(() => {
            this.messages = data; 
            this.setOption();
        });
    }

    setOption() {
        this.messages = this.messages.map((data) => {
            return {
                'isActive' : false,
                'isEdit' : false,
                ...data,
            }
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
        let dateMessage = item.date;
        if (date !== item.date) {
            isNewDate = true;
            if (item.date === today) {
                dateMessage = "Today";
            } else if (item.date === yesterday) {
                dateMessage = "Yesterday";
            }
        }
        return { isNewDate, dateMessage };
    }

    createMessage(item, date, today, yesterday) {
        let { isNewDate, dateMessage } = this.checkDate(item, date, today, yesterday);
        let className = classNames({
            "message" : true,
            "message_active" : item.isActive
        })
        return ( 
            <Message 
                key={item.id}
                data={item}
                date={dateMessage}
                isNewDate={isNewDate}
                className={className}
            />
        );
    }

    getListElements() {
        let { today, yesterday } = this.getDate();
        let data = this.getMessages();
        let date;
        let listElements = data.map((item) => {
            let element = this.createMessage(item, date, today, yesterday);
            date = item.date;
            return element;
        });
        return listElements;
    }

    resetActive() {
        this.messages.forEach((message) => message.isActive = false);
    } 

    changeMessagesActive(id, author) {
        let isMayEdit = this.main.user.checkUser(author);
        let isEdit = this.main.message.isEdit;
        let indexMessage = this.messages.findIndex((message) => message.id === id);
        if (indexMessage !== -1 && !isEdit) {
            let isActive = this.messages[indexMessage].isActive;
            this.resetActive();
            this.messages[indexMessage].isActive = !isActive;  
            this.messages[indexMessage].isMayEdit = isMayEdit;
        }
    }

    deleteExcessOption(messageData) {
        for (let key in messageData){
            if (key.includes('is')) {
                delete messageData[key];
            }
        }
    }

    updateMessage(id, text) {
        let indexMessage = this.messages.findIndex((message) => message.id === id);
        let name = this.main.channelData.getName();
        let messageData = this.messages[indexMessage];
        messageData.text = text;
        this.deleteExcessOption(messageData);
        api.messages.updateMessage(name, messageData, id);
    }
}

export default MessageList;