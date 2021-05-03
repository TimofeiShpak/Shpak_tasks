import api from "../../../api/api";
import router from "../../../router/router";
import { closeSettings, store } from "../../store";
import { PATH_HOME } from "../../helpers/constants";

interface listFriends {
  [key: string]: boolean,
}

export interface User {
  [key: string]: any
  fullName: string,
  id: string,
  src: string,
  isOnline: boolean,
  specialty: string
  twitter: string,
  instagram: string,
  facebook: string,
  linkedin: string,
  userName: string,
  Email: string,
  Skype: string,
  friends: listFriends,
  friendRequests: listFriends
}

export interface List {
  [key: string]: User
}

export interface UsersStore {
  userList: List,
  userData: User,
  isShowSettings: boolean,
  nameSettings: Array<string>
  userNameList: Array<string>
}

export function setUserData(state: UsersStore, id: string) {
  if (id) {
    state.userData = state.userList[id];
    if (!state.userData.isOnline) {
      state.userData.isOnline = true;
      router.push(PATH_HOME);
      store.state.profileData.profile = state.userData;
      api.users.updateUser(state.userData);
    } else {
      let id = store.state.profileData.profile.id;
      store.state.profileData.profile = state.userList[id];
    }
  }
}

export function changeShowSettings(state: UsersStore) {
  state.isShowSettings = !state.isShowSettings;
  if (state.isShowSettings) {
    document.addEventListener('click', closeSettings);
  } else {
    document.removeEventListener('click', closeSettings)
  }
}

export function automaticLogOut(state: UsersStore) {
  window.addEventListener('beforeunload', () => {
    state.userData.isOnline = false;
    api.users.updateUser(state.userData);
  });
}

export function prepareUserList(data: Array<User>) {
  let result: List = {};
  for (let i = 0; i < data.length; i++) {
    result[data[i].id] = data[i];
  }
  return result;
}

export async function initDataUser(state: UsersStore) {
  let dataUsers = await api.users.getUsers();
  state.userList = prepareUserList(dataUsers);
  state.userNameList = Object.values(state.userList).map((user) => user.userName);
}

export const mutations = {
  setUserData(state: UsersStore, id: string) {
    setUserData(state, id);
  },
  changeShowSettings(state: UsersStore) {
    changeShowSettings(state)
  }, 
  automaticLogOut(state: UsersStore) {
    automaticLogOut(state)
  }
};

export const getters =  {
  isUser: (state: UsersStore) => (id: string) => {
    return id === state.userData.id;
  },
  friends(state: UsersStore) {
    return Object.keys(state.userData.friends).map((id) => state.userList[id]);
  },
  friendRequests(state: UsersStore) {
    return Object.keys(state.userData.friendRequests).map((id) => state.userList[id]);
  },
  authorizationUsers(state: UsersStore) {
    return Object.values(state.userList).filter((user) => !user.isOnline);
  },
}
