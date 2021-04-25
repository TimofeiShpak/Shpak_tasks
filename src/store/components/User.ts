import { makeAutoObservable } from "mobx";
import { Lists, State, userData } from "../helpers/interfaceList";
import { userList, INIT_USER_DATA, INIT_LISTS } from '../helpers/constants'

class User {
  main: State;
  userList: Array<userData> = userList;
  userData: userData = Object.assign({}, INIT_USER_DATA);
  path: string = '/home';
  lists: Lists = Object.assign({}, INIT_LISTS);

  constructor(main: State) {
    makeAutoObservable(this);
    this.main = main;
    this.logOut = this.logOut.bind(this);
  }

  checkLogIn() {
    let id = document.cookie.slice(3);
    if (id) {
      this.setUserData(id);
    } else {
      this.path = '/authorization'
    }
  }
  
  logOut() {
    this.userData = Object.assign({}, INIT_USER_DATA);
    this.path = './authorization';
    document.cookie = 'id=';
  }

  setUserData(id: string) {
    let user = this.userList.find((user) => user.id === id);
    this.userData = Object.assign({}, user);
    document.cookie = `id=${id}`;
    this.path = '/home';
  }

  setUserList(data: Array<userData>) {
    this.userList = data;
  }
}

export default User;