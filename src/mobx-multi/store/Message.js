import { makeAutoObservable } from "mobx";
import api from '../../api/api';

class Message {
    idActive = -1;
    isEdit = false;

    constructor(main) {
        makeAutoObservable(this);
        this.main = main;
        this.handleClick = this.handleClick.bind(this);
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

    handleClickAddressee(idAddressee) {
        this.main.profileData.changeProfile(idAddressee);  
    }

    checkEvents(event, id, userName, idUser, idAddressee) {
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
            this.main.profileData.changeProfile(idUser);
            break;
            case classList.contains('message__addressee') : this.handleClickAddressee(idAddressee);
            break;
            default : this.changeMessagesActive(id);
        }
    }

    handleClick(event, id, userName, idUser, idAddressee) {
        let elem = event.target.closest('.message');
        if (elem) {
            this.checkEvents(event, id, userName, idUser, idAddressee);
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
        this.input.focus();
        this.isEdit = true;
        this.main.inputMessage.value = '';
        this.input.oninput = () => {
            this.input.style.height = '20px';
            this.input.style.height = this.input.scrollHeight + 'px';
        }
    }

    saveMessage(event, id) {
        event.target.textContent = 'Edit';
        event.target.nextElementSibling.classList.add('hide');
        let text = this.input.value.trim();
        this.messageText.textContent = text;
        this.input.replaceWith(this.messageText);
        this.isEdit = false;
        this.main.messageList.updateMessage(id, text);
    }

    getButtonsEdit(id, idUser) {
        if (this.idActive === id) {
            let isPresent = this.main.userList.users.findIndex((user) => user.id === idUser) === -1;
            if (this.main.user.userData.id === idUser) {
                return (
                    <div className="message__button-list">
                        <button className="message__btn btn_edit">Edit</button>
                        <button className="message__btn btn_cancel hide">Cancel</button> 
                        <button className="message__btn btn_delete">Delete</button> 
                    </div>
                )
            } else if(!isPresent) {
                return  <button className="message__btn btn_answer">Write</button> 
            }
        }
    }

    changeMessagesActive(id) {
        if (!this.isEdit) {
            if (this.idActive === id) {
                this.idActive = -1;
            } else {
                this.idActive = id;
            }
        }
    }
}

export default Message;