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

    deleteFromFriends(userName) {
        this.main.userList.users.forEach((user) => {
            if (user.friends[userName] || user.friendRequests[userName]) {
                delete user.friends[userName];
                delete user.friendRequests[userName];
                api.profileData.changeProfileData(user, user.id);
            }
        });
    }

    deleteUser() {
        this.main.channelData.path = '/authorization';
        let id = this.userData.id;
        document.cookie = "userName=";
        this.deleteFromFriends(this.userData.userName);
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

    removeRequestFriend(userName) {
        delete this.userData.friendRequests[userName];
        this.updateProfileData();
    }

    addFriend(userName) {
        let friend = this.main.userList.users.find((user) => user.userName === userName);
        friend.friends[this.userData.userName] = true;
        this.userData.friends[userName] = true;
        this.removeRequestFriend(userName);
        api.profileData.changeProfileData(friend, friend.id);
    }

    removeFriend(userName) {
        let profileName = this.main.profileData.profile.userName;
        let friend = this.main.userList.users.find((user) => user.userName === profileName);
        delete friend.friends[userName];
        delete this.userData.friends[profileName];
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