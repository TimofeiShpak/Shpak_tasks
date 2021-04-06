import { makeAutoObservable } from "mobx";
import api from "../../api/api";

class User {
    userData = [];
    channelPath = '/authorization';

    constructor(main) {
        makeAutoObservable(this);
        this.main = main;
        this.chooseUser = this.chooseUser.bind(this);
        this.logOut = this.logOut.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.editUserData = this.editUserData.bind(this);
    }

    getUserData() {
        let className = "user-item ";
        className += this.userData[0].status === 'online' ? 'user-item-active' : '';
        let fullName = this.userData[0].fullName;
        let src = this.userData[0].src;
        let userName = this.userData[0].userName;
        return { className, fullName, src, userName };
    }

    getChannelPath() {
        return this.channelPath;
    }

    checkFullName(value) {
        let fullName = value;
        let userDataIndex = this.main.userList.userList.findIndex((data) => data.fullName === fullName);
        if (userDataIndex !== -1) {
            this.channelPath = '/' + this.main.channelData.getName();
            this.userData = this.main.userList.userList.splice(userDataIndex, 1);
            this.userData[0].status = 'online';
            let userName = this.userData[0].userName;
            this.main.profileData.changeProfile(userName);
            this.main.editProfile.initValues();
        }
        return fullName;
    }
    
    chooseUser(event) {
        let elem = event.target.closest('.user-item');
        if (elem) {
            let fullName = this.checkFullName(elem.textContent);
            document.cookie = `fullName=${fullName}`;
        }
    }

    settingsHandleClick(event) {
        let elem = event.target.closest('.settings');
        if (elem) {
            elem.classList.toggle('settings_close')
        }
    }

    logOut() {
        document.cookie = "fullName=";
        let userData = this.userData[0];
        this.main.userList.userList.push(userData);
        this.userData.length = 0;
        this.channelPath = '/authorization';
    }

    checkUser(fullName) {
        return this.userData[0].fullName === fullName;
    }

    deleteUser() {
        let id = this.userData[0].id;
        document.cookie = "fullName=";
        this.userData.length = 0;
        api.profileData.deleteProfileData(id);
        this.channelPath = '/authorization';
    }

    editUserData() {
        this.channelPath = '/edit-profile';
    }
}

export default User;