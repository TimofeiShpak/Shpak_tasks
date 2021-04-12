import { makeAutoObservable, runInAction } from "mobx";
import classNames from 'classnames';

import api from '../../api/api';

const TIME_UPDATE = 3000;
const NUMBER_FOR_COOKIE = 9;
const SRC_ANONIM = './anonim.jpg';

class UserList {
    users = [];
    userNames = [];

    constructor(main) {
        makeAutoObservable(this);
        this.main = main;

        this.updateData();
    }

    getData() {
        api.users.getUsers()
            .then((data) => {
                runInAction(() => this.changeData(data))
            });
    }

    updateData() {
        this.getData();
        setInterval(() => this.getData(), TIME_UPDATE);
    }

    changeData(data) {
        if (JSON.stringify(data) !== JSON.stringify(this.users)) {
            this.users = data;
            this.checkSrc();
            this.userNames = this.users.map((user) => user.userName);
            this.userNames.push('@deleted');
            this.main.user.checkUserName(document.cookie.slice(NUMBER_FOR_COOKIE));
            this.main.profileData.changeProfile(this.main.profileData.profile.id);
        }
        
    }

    checkSrc() {
        this.users.map((user) => {
            user.src = user.src || SRC_ANONIM;
            return user;
        });
    }

    getFriends() {
        let friendsElements = [];
        let friendsUserNames = this.main.user.userData.friends;
        if (friendsUserNames) {
            let friends = this.users.filter((user) => friendsUserNames[user.id] === true);
            friendsElements = this.getUserList(friends);
        }
        return friendsElements;
    }

    getFreeUsers() {
        let freeUsersElements = [];
        if (this.users.length) {
            let freeUsers = this.users.filter((user) => user.status !== 'online');
            freeUsersElements = this.getUserList(freeUsers);
        }
        return freeUsersElements;
    }

    getFriendRequests() {
        let elements = [];
        let requests = this.main.user.userData.friendRequests;
        let friendRequests = this.users.filter((user) => requests[user.id] === true);
        elements = this.getUserList(friendRequests);
        return elements;
    }

    getUserList(data) {
        let users = data || this.users;
        let listElements = users.map((item) => {
            let className = classNames({
                "user-item": true,
                "user-item-active" : item.status === 'online'
            });
            return  { className, key: item.id, data: item }
        });
        return listElements;
    }
}

export default UserList;