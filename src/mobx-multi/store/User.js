import { makeAutoObservable } from "mobx";
import api from "../../api/api";

class User {
    userData = {};
    userDataIndex = 0;
    isVisibleSetting = false;

    constructor(main) {
        makeAutoObservable(this);
        this.main = main;
        this.chooseUser = this.chooseUser.bind(this);
        this.logOut = this.logOut.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.setListener();
        this.settingsHandleClick = this.settingsHandleClick.bind(this);
        this.closeSettings = this.closeSettings.bind(this);
    }

    setListener() {
        window.addEventListener('beforeunload', () => {
            let data = this.main.userList.users[this.userDataIndex];
            data.status = 'offline';
            this.changeStatus(data);
        });
    }

    getUserData() {
        let className = "user-item ";
        className += this.userData.status === 'online' ? 'user-item-active' : '';
        let data = this.userData;
        return { className, data };
    }

    checkUserName(userName) {
        this.userDataIndex = this.main.userList.users.findIndex((data) => data.userName === userName);
        if (this.userDataIndex !== -1) {
            this.userData = this.main.userList.users[this.userDataIndex];
            if (this.userData.status !== 'online') {
                this.userData.status = 'online';
                this.changeStatus(this.userData);
                this.main.channelData.path = '/' + this.main.channelData.getName();
                this.main.profileData.changeProfile(this.userData.id);
            }
        } else {
            this.main.channelData.path = '/authorization';
        }
        return userName;
    }
    
    chooseUser(event) {
        let elem = event.target.closest('.user-item');
        if (elem) {
            let fullName = elem.textContent;
            let data = this.main.userList.users.find((data) => data.fullName === fullName);
            let userName = this.checkUserName(data.userName);
            this.changeStatus(this.userData);
            this.main.channelData.path = '/' + this.main.channelData.getName(); 
            document.cookie = `userName=${userName}`;
        }
    }

    settingsHandleClick() {
        this.isVisibleSetting = !this.isVisibleSetting;
        document.addEventListener('click', this.closeSettings);
    }

    closeSettings(event) {
        let isSettings = event.target.classList.contains('settings__btn'); 
        if (!isSettings) {
            this.isVisibleSetting = false;
            document.removeEventListener('click', this.closeSettings);
        }
    }

    logOut() {
        this.main.channelData.path = '/authorization';
        document.cookie = "userName=";
        let data = this.main.userList.users[this.userDataIndex];
        data.status = 'offline';
        this.changeStatus(data);
    }

    deleteFromFriends(id) {
        this.main.userList.users.forEach((user) => {
            if (user.friends[id] || user.friendRequests[id]) {
                delete user.friends[id];
                delete user.friendRequests[id];
                api.profileData.changeProfileData(user, user.id);
            }
        });
    }

    deleteUser() {
        this.main.channelData.path = '/authorization';
        let id = this.userData.id;
        document.cookie = "userName=";
        this.deleteFromFriends(this.userData.id);
        this.userData = null;
        this.main.userList.users.splice(this.userDataIndex, 1);
        api.profileData.deleteProfileData(id);
    }

    updateProfileData() {
        let id = this.userData.id;
        delete this.userData.isUser;
        api.profileData.changeProfileData(this.userData, id);
        this.main.profileData.changeProfile(id);
    }

    removeRequestFriend(id) {
        delete this.userData.friendRequests[id];
        this.updateProfileData();
    }

    addFriend(id) {
        let friend = this.main.userList.users.find((user) => user.id === id);
        friend.friends[this.userData.id] = true;
        this.userData.friends[id] = true;
        this.removeRequestFriend(id);
        api.profileData.changeProfileData(friend, friend.id);
    }

    removeFriend(id) {
        let idProfile = this.main.profileData.profile.id;
        let friend = this.main.userList.users.find((user) => user.id === idProfile);
        delete friend.friends[id];
        delete this.userData.friends[idProfile];
        api.profileData.changeProfileData(friend, friend.id);
        this.updateProfileData();
    }

    changeStatus(data) {
        if (data) {
            let id = data.id;
            api.profileData.changeProfileData(data, id);
        }
    }
}

export default User;