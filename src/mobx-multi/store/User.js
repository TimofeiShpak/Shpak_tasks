import { makeAutoObservable } from "mobx";

class User {
    userData = [];

    constructor(main) {
        makeAutoObservable(this);
        this.main = main;
        this.chooseUser = this.chooseUser.bind(this);
    }

    getUserData() {
        let fullName = '';
        let src = '';
        let className = "user-item ";
        let userName = ""
        if (this.userData.length) {
            let data  = this.userData[0]
            className += data.status === 'online' ? 'user-item-active' : '';
            fullName = data.fullName;
            src = data.src;
            userName = data.extraInfo.userName;
        }
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
}

export default User;