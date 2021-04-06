import { makeAutoObservable, runInAction } from "mobx";
import classNames from 'classnames';

import api from '../../api/api';
import UserItem from '../../components/navigation/UserItem';

class UserList {
    userList = [];
    userNames = [];

    constructor(main) {
        makeAutoObservable(this);
        this.main = main;

        api.friends.getFriends()
            .then((data) => {
                runInAction(() => this.changeData(data))
            });
    }

    changeData(data) {
        this.userList = data;
        this.checkSrc();
        this.userNames = this.userList.map((user) => user.userName);
        this.main.user.checkFullName(document.cookie.slice(9));
    }

    checkSrc() {
        this.userList.map((user) => {
            user.src = user.src || './anonim.jpg';
            return user;
        });
    }

    getUserList() {
        let listElements = this.userList.map((item) => {
            let className = classNames({
                "user-item": true,
                "user-item-active" : item.status === 'online'
            });
            let key = this.main.getId();
            return (
                <UserItem 
                    className={className}
                    key={key} 
                    fullName={item.fullName} 
                    status={item.status} 
                    src={item.src}
                    userName={item.userName}
                />
            );
        });
        return listElements;
    }
}

export default UserList;