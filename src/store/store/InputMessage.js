import { makeAutoObservable, runInAction } from "mobx";
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
        let { name } = this.main.userList.getUserData();
        if(name !== value) {
            this.inputElement.current.focus();
            value = value.split(' ').join('_');
            this.value = `@${value} `;
        }
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

    createMessage() {
        let { text, src } = this.main.userList.userData[0];
        let name = this.main.channelData.name;
        let addressee = this.checkAddressee();
        let messageData = {
            "date":"Saturday, October 25st", 
            "author" : text, 
            "id" : this.main.getId(), 
            "time" : "6:48 PM", 
            "dataMessage" : [{"addressee" : addressee}, {"text":  this.value.slice(0,-1)}], 
            "avatarSrc" : src,
            "key" : this.main.getId()
        };
        api.messages.addMessages(name, messageData)
            .then(() => {
                runInAction(() => {
                    this.main.messageList.update(name)
                });
            });
    }

    getTextarea() {
        let placeholder = `Message in #${this.main.channelData.name}`;

        return <textarea
            ref={this.inputElement}
            rows="1" 
            className="input-message__textarea" 
            type="text" 
            placeholder={placeholder} 
            onInput={this.onInput}
            value={this.value}
        />
    }
}

export default InputMessage;