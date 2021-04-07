import { makeAutoObservable } from "mobx";
import api from "../../api/api";

class User {
    userData = {};
    userDataIndex = 0;

    constructor(main) {
        makeAutoObservable(this);
        this.main = main;
        this.chooseUser = this.chooseUser.bind(this);
        this.logOut = this.logOut.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.setListener();
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

    settingsHandleClick(event) {
        let elem = event.target.closest('.settings');
        if (elem) {
            elem.classList.toggle('settings_close')
        }
    }

    logOut() {
        this.main.channelData.path = '/authorization';
        document.cookie = "userName=";
        let data = this.main.userList.users[this.userDataIndex];
        data.status = 'offline';
        this.changeStatus(data);
    }

    deleteUser() {
        this.main.channelData.path = '/authorization';
        let id = this.userData.id;
        document.cookie = "userName=";
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
        let indexUser = this.userData.friendRequests.findIndex((name) => name === userName);
        this.userData.friendRequests.splice(indexUser, 1);
        this.updateProfileData();
    }

    addFriend(userName) {
        let friend = this.main.userList.users.find((user) => user.userName === userName);
        friend.friends.push(this.userData.userName);
        this.userData.friends.push(userName);
        this.removeRequestFriend(userName);
        api.profileData.changeProfileData(friend, friend.id);
    }

    removeFriend(userName) {
        let profileName = this.main.profileData.profile.userName;
        let indexUserName = this.userData.friends.findIndex((friend) => friend === profileName);
        let friend = this.main.userList.users.find((user) => user.userName === profileName);
        let friendIdex = friend.friends.findIndex((name) => name === userName);

        friend.friends.splice(friendIdex, 1);
        api.profileData.changeProfileData(friend, friend.id);
        this.userData.friends.splice(indexUserName, 1);
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