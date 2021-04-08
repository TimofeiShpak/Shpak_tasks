import { makeAutoObservable } from "mobx";
import api from "../../api/api";

import LabelItem from '../../components/profile/LabelItem';

const options = ['userName', 'fullName', 'specialty','twitter', 'instagram', 
    'facebook', 'linkedin', 'Email', 'Skype'];
const requiredOptions = ['userName', 'fullName'];
const initValues = { 'userName' : '', 'fullName' : '', 'specialty' : '', 'twitter' : '',
    'instagram' : '', 'facebook' : '', 'linkedin' : '', 'Email' : '', 'Skype' : '' };

const PATH_EDIT_PROFILE = '/edit-profile';

class EditProfile {
    values = initValues;
    isWrong = false;

    constructor(main) {
        makeAutoObservable(this);
        this.main = main;
        this.editUserData = this.editUserData.bind(this);
    }

    initValues() {
        let userData = this.main.user.userData;
        userData.userName = userData.userName.replace('@', '');
        options.forEach((option) => this.values[option] = userData[option]);
    }

    getInput(option) {
        let isRequired = requiredOptions.includes(option);
        let value = this.values[option];
        let func = (event) => this.onInput(event, option);
        return (
            <input 
                key={option}
                type="text" 
                name={option} 
                onChange={func}
                value={value}
                required={isRequired}
            />
        );
    }

    onInput(event, option) {
        this.input = event.target;
        this.values[option] = event.target.value;
    }

    getElements() {
        return options.map((option) => this.getInput(option));
    }

    getLabelList() {
        let list = options.map((option) => {
            let id = this.main.getId();
            return (
                <LabelItem key={id} option={option} />
            )
        });
        return list;
    }

    updateMessage(message, name) {
        let dataMessage = Object.assign({}, message);
        api.messages.updateMessage(name, dataMessage, message.id);
    }

    editMessages(fullName, userName, id) {
        let name = this.main.channelData.getName();
        this.main.messageList.messages = this.main.messageList.messages.map((message) => {
            if (message.idUser === id) {
                message.author = fullName;
                message.userName = userName;
                this.updateMessage(message, name)
            } else if (message.idAddressee === id) {
                message.addressee = userName;
                this.updateMessage(message, name);
            }
            return message;
        });
    }

    checkData(event) {
        event.preventDefault();
        let userName = '@' + this.values.userName;
        let isValid = this.main.userList.userNames.includes(userName);
        if (!isValid) {
            this.isWrong = false;
            this.saveProfile(userName);
        } else {
            this.isWrong = true;
        }
    }

    saveProfile(userName) {
        let userData = this.main.user.userData;
        let id = userData.id;
        let dataIndex = this.main.user.userDataIndex;
        let data = { ...userData, ...this.values };
        data.userName = userName;
        api.profileData.changeProfileData(data, id);
        this.main.userList.users[dataIndex] = data;
        this.main.user.checkUserName(userName);
        this.main.channelData.path = '/' + this.main.channelData.getName(); 
        document.cookie=`userName=${userName}`;
        this.main.profileData.changeProfile(id);
        this.editMessages(data.fullName, userName, id)
    }

    editUserData() {
        this.initValues();
        this.main.channelData.path = PATH_EDIT_PROFILE;
    }
}

export default EditProfile;