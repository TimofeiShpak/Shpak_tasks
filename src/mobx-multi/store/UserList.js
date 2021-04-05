import { makeAutoObservable, runInAction } from "mobx";
import classNames from 'classnames';

import api from '../../api/api';
import UserItem from '../../components/navigation/UserItem';

class UserList {
    userList = [];

    constructor(main) {
        makeAutoObservable(this);
        this.main = main;

        api.friends.getFriends()
            .then((data) => {
                runInAction(() => this.userList = data);
            })
            .then(() => this.main.user.checkFullName(document.cookie.slice(9)))
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
                />
            );
        });
        return listElements;
    }
}

export default UserList;