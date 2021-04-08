import classNames from "classnames";
import { makeAutoObservable } from "mobx";
import { createRef } from "react";
import api from '../../api/api';

const HEIGHT_INPUT = '37px';
const smiles = ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃",
    "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "☺", "😚", "😙", "😋",
    "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐",
    "😑", "😶", "😏", "😒", "🙄", "😬", "🤥", "😌", "😔", "😪", "🤤", "😴",
    "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "🤯", "🤠",
    "🥳", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹", "😮", "😯", "😲", "😳",
    "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞",
    "😓", "😩", "😫", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠", "💩",
    "🤡", "👹", "👺", "👻", "👽", "👾"];

class InputMessage {
    value = '';
    isVisible = false;

    constructor(main) {
        makeAutoObservable(this);
        this.main = main;
        this.onInput = this.onInput.bind(this);
        this.addAddressee = this.addAddressee.bind(this);
        this.checkKeyDown();
        this.inputElement = createRef();
        this.onKeyUp = this.onKeyUp.bind(this);
        this.changeVisibleSmileContainer = this.changeVisibleSmileContainer.bind(this);
        this.addSmile = this.addSmile.bind(this);
        this.closeContainer = this.closeContainer.bind(this);
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

    getIdAddressee(addressee) {
        let result = '';
        if (addressee) {
            let idUser = this.main.userList.users.find((user) => user.userName === addressee).id;
            result += idUser;
        }
        return result;
    }

    getMessageData(data) {
        let { date, fullName, userName, idMessage, time, src, addressee, id, idAddressee } = data;
        return  {
            "date": date, 
            "author" : fullName, 
            "userName" : userName,
            "addressee" : addressee,
            "idAddressee" : idAddressee,
            "id" : idMessage, 
            "time" : time, 
            "text" : this.value.slice(0,-1),
            "avatarSrc" : src,
            "idUser" : id
        };
    }

    createMessage() {
        let { fullName, src, userName, id } = this.main.user.userData;
        let name = this.main.channelData.getName();
        let addressee = this.checkAddressee();
        let idAddressee = this.getIdAddressee(addressee);
        let time = new Date().toLocaleTimeString().slice(0,-3);
        let date = new Date().toLocaleDateString();
        let idMessage = this.main.getId();
        let data = { date, fullName, userName, idMessage, time, src, addressee, id, idAddressee }
        let messageData = this.getMessageData(data);
        api.messages.addMessages(name, messageData)
        this.main.messageList.messages.push(messageData);
    }

    onKeyUp() {
        this.inputElement.current.style.height = HEIGHT_INPUT;
        this.inputElement.current.style.height = this.inputElement.current.scrollHeight + 'px';
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
                onKeyUp={this.onKeyUp}
            />
        );
    }

    changeVisibleSmileContainer() {
        this.isVisible = !this.isVisible;
        if (this.isVisible) {
            window.addEventListener('click', this.closeContainer);
        } else {
            window.removeEventListener('click', this.closeContainer);
        }
    }

    addSmile(text) {
        this.value += text;
    }

    getSmiles() {
        return smiles.map((smile) => {
            let id = this.main.getId();
            let onClick = () => this.addSmile(smile);
            return (
                <span key={id} className="smiles__item" onClick={onClick}>{smile}</span>
            )
        });
    }

    closeContainer(event) {
        let elem = event.target;
        let isSmileContainer = elem.closest('.smiles') || elem.classList.contains('smiles__item'); 
        if (!isSmileContainer) {
            this.isVisible = false;
            window.removeEventListener('click', this.closeContainer);
        }
    }
}

export default InputMessage;