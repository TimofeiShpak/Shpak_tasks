import { Module } from 'vuex'
import { INIT_USER, NAME_ICONS, NAME_EXTRA_INFO, MESSAGE, 
  ADD_FRIEND, REMOVE_FRIEND, ACCEPT_REQUEST, CANCEL_REQUEST, CANCEL_INVITATION } from '../helpers/constants';
import { getId } from '../helpers/helpers';
import { User } from './users/user.helpers';
import { State, store } from '../store';

export interface ProfileStore {
  profile: User,
  isOpen: boolean,
}

export const profileData: Module<ProfileStore, State> = {
  namespaced: true,

  state: {
    profile: INIT_USER,
    isOpen: true,
  },

  mutations: {
    setProfileData(state, data) {
      state.profile = data;
    },
    setProfile(state, id) {
      state.isOpen = true;
      state.profile = store.state.userListData.userList[id];
    },
    closeProfile(state) {
      state.isOpen = false;
    }
  },

  actions: {
    setProfile({ commit }, event) {
      let id = event.target.closest('.user-item')?.dataset?.id;
      commit('setProfile', id);
    },
  },

  getters: {
    socialLinksData(state: ProfileStore) {
      let linksData = [];
      for (let name of NAME_ICONS) {
        let data = state.profile[name];
        if (data) {
          let key = getId();
          let elemData = { name, key, href: data} 
          linksData.push(elemData);
        }
      }
      return linksData;
    },
    extraInfoData(state: ProfileStore) {
      let itemsInfo = [];
      for (let name of NAME_EXTRA_INFO) {
        let dataElem = state.profile[name];
        if (name === 'userName') {
          dataElem = '@' + dataElem;
        }
        if (dataElem) {
          let key = getId();
          let elemData = { key, type: name, value: dataElem };
          itemsInfo.push(elemData);
        }
      }
      return itemsInfo;
    },
    buttonsData(state) {
      let userData = store.state.userListData.userData;
      let isUser = userData.userName === state.profile.userName;
      let isFriend = userData.friends[state.profile.id];
      let isRequestFriend = userData.friendRequests[state.profile.id];
      let isAskFriend = state.profile.friendRequests[userData.id];
      let data = [];
      if (!isUser) {
        data.push(MESSAGE);
      }
      if (isFriend) {
        data.push(REMOVE_FRIEND);
      } else if (isRequestFriend) {
        data.push(ACCEPT_REQUEST, CANCEL_REQUEST);
      } else if (isAskFriend) {
        data.push(CANCEL_INVITATION);
      } else if (!isUser && !isFriend && !isRequestFriend) {
        data.push(ADD_FRIEND);
      }
      return data;
    }
  }
}