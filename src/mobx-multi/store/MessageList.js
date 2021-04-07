import { makeAutoObservable, runInAction } from "mobx";
import classNames from 'classnames';

import api from '../../api/api';
import Message from '../../components/main/Message';

const userOptions = ['isActive', 'isEdit', 'isMayEdit'];

class MessageList {
    messages = [];
    value = -1;

    constructor(main) {
        makeAutoObservable(this);
        this.main = main;

        this.updateData();
    };

    getData(isCheck) {
        let index = this.main.channelData.index;
        let name = this.main.channelData.getName();
        if ((isCheck || this.value !== index) && name) {
            runInAction(() => this.value = index);
            this.changeData(name);
        }
      
    }

    updateData() {
        this.getData(true);
        setInterval(() => this.getData(true), 5000);
    }

    changeData(name) {
        api.messages.getMessages(name)
            .then((data) => this.setData(data))
    }

    checkEqual(firstData, secondData) {
        let result = false;
        if (firstData.length !== secondData.length) {
            return result;
        }
        for (let i = 0; i < firstData.length; i++) {
            for (let key in firstData[i]) {
                if (!userOptions.includes(key)) {
                    result = firstData[i][key] === secondData[i][key];
                }
            } 
        }
        return result;
    }

    getCopyData(oldData, data) {
        let resultData = [];
        for (let i = 0; i < data.length; i++) {
            let dataMessage = oldData[i] || {};
            resultData[i] = Object.assign(dataMessage, data[i]);
        }
        this.messages = resultData;
    }

    setData(data) {
        let oldData = Object.assign({}, this.messages);
        this.getCopyData(oldData, data);
        this.setOption();
    }

    setOption() {
        this.messages = this.messages.map((data) => {
            return {
                'isActive' : false,
                ...data,
            }
        });
    }

    getMessages() {
        let index = this.main.channelData.index;
        let name = this.main.channelData.getName();
        if (this.value !== index && name) {
            runInAction(() => this.value = index)
            this.changeData(name);
        }
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
        let listElements = [];
        this.getData();
        if (this.messages.length) {
            let { today, yesterday } = this.getDate();
            let date;
            listElements = this.messages.map((item) => {
                let element = this.createMessage(item, date, today, yesterday);
                date = item.date;
                return element;
            });
        }
        return listElements;
    }

    resetActive() {
        this.messages.forEach((message) => message.isActive = false);
    } 

    changeMessagesActive(id, idUser) {
        let isMayEdit = this.main.user.userData.id === idUser;
        let isEdit = this.main.message.isEdit;
        let isPresent = this.main.userList.users.findIndex((user) => user.id === idUser) !== -1;
        let indexMessage = this.messages.findIndex((message) => message.id === id);
        if (indexMessage !== -1 && !isEdit) {
            let isActive = this.messages[indexMessage].isActive;
            this.resetActive();
            this.messages[indexMessage].isActive = !isActive;  
            this.messages[indexMessage].isMayEdit = isMayEdit;
            this.messages[indexMessage].isPresent = isPresent;
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