import { makeAutoObservable } from "mobx";
import api from '../../api/api';

class Message {
    constructor(main) {
        makeAutoObservable(this);
        this.main = main;
        this.handleClickMessage = this.handleClickMessage.bind(this);
        this.editMessage = this.editMessage.bind(this);
        this.saveMessage = this.saveMessage.bind(this);
    }

    handleClickEditBtn(event, id) {
        if (!this.isEdit) {
            this.editMessage(event);
        } else {
            this.saveMessage(event, id);
        }
    }

    handleClickDeleteBtn(id) {
        let name = this.main.channelData.getName();
        api.messages.deleteMessage(name, id);
        let indexMessage = this.main.messageList.messages.findIndex((message) => message.id === id);
        this.main.messageList.messages.splice(indexMessage, 1);
        this.isEdit = false;
    }

    handleClickAddressee(event) {
        let userName = event.target.textContent;
        this.main.profileData.changeProfile(userName);  
    }

    checkEvents(event, id, userName, author) {
        let classList = event.target.classList;
        switch (true) {
            case classList.contains('btn_edit') :  this.handleClickEditBtn(event, id);
            break;
            case classList.contains('btn_delete') : this.handleClickDeleteBtn(id);
            break;
            case classList.contains('btn_answer') : this.main.inputMessage.addAddressee(userName);
            break;
            case classList.contains('btn_cancel') : this.cancelEdit(event);
            break;
            case classList.contains('user-item__img') || classList.contains('message__author') :
            this.main.profileData.changeProfile(userName);
            break;
            case classList.contains('message__addressee') : this.handleClickAddressee(event);
            break;
            default : this.main.messageList.changeMessagesActive(id, author);
        }
    }

    handleClickMessage(event, id, author, userName) {
        let elem = event.target.closest('.message');
        if (elem) {
            this.checkEvents(event, id, userName, author);
        }
    }

    cancelEdit(event) {
        let elem = event.target;
        this.editBtn.textContent = 'Edit';
        this.isEdit = false;
        this.input.replaceWith(this.messageText);
        elem.classList.add('hide');
    }

    editMessage(event) {
        let elem = event.target;
        this.editBtn = elem;
        elem.nextElementSibling.classList.remove('hide');
        elem.textContent = 'Save';
        this.messageText = elem.closest('.message').querySelector('.message__text');
        this.input = document.createElement('textarea');
        this.input.value = this.messageText.textContent;
        this.input.style.height = this.messageText.offsetHeight + 'px';
        this.input.classList.add('message__input');
        this.messageText.replaceWith(this.input);
        this.isEdit = true;
    }

    saveMessage(event, id) {
        event.target.textContent = 'Edit';
        let text = this.input.value
        this.messageText.textContent = text;
        this.input.replaceWith(this.messageText);
        this.isEdit = false;
        this.main.messageList.updateMessage(id, text);
    }

    getButtonsEdit(isMayEdit, isActive) {
        if (isActive) {
            if (isMayEdit) {
                return (
                    <div className="message__button-list">
                        <button className="message__btn btn_edit">Edit</button> 
                        <button className="message__btn btn_cancel hide">Cancel</button> 
                        <button className="message__btn btn_delete">Delete</button> 
                    </div>
                )
            } else {
                return  <button className="message__btn btn_answer">Answer</button> 
            }
        }
    }
}

export default Message;