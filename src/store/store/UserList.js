import { makeAutoObservable, runInAction } from "mobx";

import api from '../../api/api';
import UserItem from '../../components/navigation/UserItem';

class UserList {
    userList = [];
    userData = [];
    constructor(main) {
        makeAutoObservable(this);
        this.main = main;

        api.friends.getFriends()
            .then((data) => {
                runInAction(() => {
                    this.userList = data;
                    let userDataIndex = this.userList.findIndex((data) => data.isUser === true);
                    this.userData = this.userList.splice(userDataIndex, 1);
                });
            });
    }

    getUserList() {
        let listElements = this.userList.map((item) => {
            let className = "user-item ";
            className += item.status === 'online' ? 'user-item-active' : '';
            let key = this.main.getId();
            return <UserItem 
                        className={className}
                        key={key} 
                        text={item.text} 
                        status={item.status} 
                        src={item.src}
                    />
        });
        return listElements;
    }

    getUserData() {
        let name = '';
        let src = '';
        let className = "user-item user ";
        if (this.userData.length) {
            let data  = this.userData[0]
            className += data.status === 'online' ? 'user-item-active' : '';
            name = data.text;
            src = data.src;
        }
        return { className, name, src };
    }
}

export default UserList;