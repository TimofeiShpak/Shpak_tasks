import { makeAutoObservable } from "mobx";

class User {
    userData = [];

    constructor(main) {
        makeAutoObservable(this);
        this.main = main;
        this.chooseUser = this.chooseUser.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    getUserData() {
        let className = "user-item ";
        className += this.userData[0].status === 'online' ? 'user-item-active' : '';
        let fullName = this.userData[0].fullName;
        let src = this.userData[0].src;
        let userName = this.userData[0].extraInfo.userName;
        return { className, fullName, src, userName };
    }

    getChannelPath() {
        this.channelPath = '/authorization';
        if (this.userData.length) {
            this.channelPath = '/' + this.main.channelData.getName();
        }
        return this.channelPath;
    }

    checkFullName(value) {
        let fullName = value;
        let userDataIndex = this.main.userList.userList.findIndex((data) => data.fullName === fullName);
        if (userDataIndex !== -1) {
            this.channelPath = '/' + this.main.channelData.getName();
            this.userData = this.main.userList.userList.splice(userDataIndex, 1);
            this.userData[0].status = 'online';
            this.main.profileData.changeProfile(fullName);
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
    }

    checkUser(fullName) {
        return this.userData[0].fullName === fullName;
    }
}

export default User;