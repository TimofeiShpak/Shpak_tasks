import { makeAutoObservable, runInAction } from "mobx";
import classNames from 'classnames';

import api from '../../api/api';
import UserItem from '../../components/navigation/UserItem';
import RequestItem from '../../components/navigation/RequestItem';

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
        setInterval(() => this.getData(), 2000);
    }

    changeData(data) {
        if (JSON.stringify(data) !== JSON.stringify(this.users)) {
            this.users = data;
            this.checkSrc();
            this.userNames = this.users.map((user) => user.userName);
            this.main.user.checkUserName(document.cookie.slice(9));
            this.main.profileData.changeProfile(this.main.profileData.profile.id);
        }
        
    }

    checkSrc() {
        this.users.map((user) => {
            user.src = user.src || './anonim.jpg';
            return user;
        });
    }

    getFriends() {
        let friendsElements = [];
        let friendsUserNames = this.main.user.userData.friends;
        if (friendsUserNames) {
            let friends = this.users.filter((user) => friendsUserNames.includes(user.userName));
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
        let requests = this.main.user.userData.friendRequests.slice();
        let friendRequests = this.users.filter((user) => requests.includes(user.userName));
        elements = this.getUserList(friendRequests, true);
        return elements;
    }

    getUserList(data, isRequest) {
        let users = data || this.users;
        let listElements = users.map((item) => {
            let className = classNames({
                "user-item": true,
                "user-item-active" : item.status === 'online'
            });
            return  !isRequest ? (
                    <UserItem className={className} key={item.id} data={item} />
                ) : (
                    <RequestItem className={className} key={item.id} data={item} />
                )
        });
        return listElements;
    }
}

export default UserList;