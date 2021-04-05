import { makeAutoObservable } from "mobx";
import { createRef } from "react";
import api from '../../api/api';

class InputMessage {
    value = '';
    constructor(main) {
        makeAutoObservable(this);
        this.main = main;
        this.onInput = this.onInput.bind(this);
        this.addAddressee = this.addAddressee.bind(this);
        this.checkKeyDown();
        this.inputElement = createRef();
    }

    onInput(event) {
        this.value = event.target.value;
    }

    addAddressee(value) {
        this.inputElement.current.focus();
        value = value.split(' ').join('_');
        this.value = `${value} `;
        this.main.messageList.resetActive();
    }

    checkKeyDown() {
        document.addEventListener('keyup', (event)=> {
            if(event.code === 'Enter' && this.value.trim() !== '') {
                this.createMessage();
                this.value = '';
            }
        });
    }

    checkAddressee() {
        let addressee = '';
        if (this.value[0] === ('@')) {
            let words = this.value.split(' ');
            addressee = words[0];
            this.value = words.slice(1).join(' ');
        }
        return addressee;
    }

    getMessageData(date, fullName, userName, id, time, src, addressee) {
        return  {
            "date": date, 
            "author" : fullName, 
            "userName" : userName,
            "addressee" : addressee,
            "id" : id, 
            "time" : time, 
            "text" : this.value.slice(0,-1),
            "avatarSrc" : src
        };
    }

    createMessage() {
        let { fullName, src, extraInfo : { userName } } = this.main.user.userData[0];
        let name = this.main.channelData.getName();
        let addressee = this.checkAddressee();
        let time = new Date().toLocaleTimeString().slice(0,-3);
        let date = new Date().toLocaleDateString();
        let id = this.main.getId();
        let messageData = this.getMessageData(date, fullName, userName, id, time, src, addressee);
        api.messages.addMessages(name, messageData)
        this.main.messageList.messages.push(messageData);
    }

    getTextarea() {
        let placeholder = `Message in #${this.main.channelData.getName()}`;

        return (
            <textarea
                ref={this.inputElement}
                className="input-message__textarea" 
                type="text" 
                placeholder={placeholder} 
                onInput={this.onInput}
                value={this.value}
            />
        );
    }
}

export default InputMessage;