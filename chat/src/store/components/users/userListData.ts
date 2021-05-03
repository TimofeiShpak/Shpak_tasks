import { Module } from 'vuex'
import router from '../../../router/router';
import { State, store } from '../../store';
import { resetInputMessage } from '../InputMessage';
import { INIT_USER, LOG_OUT, EDIT_PROFILE, DELETE_PROFILE, NAME_SETTINGS, 
  PATH_AUTHORIZATION, PATH_EDIT_PROFILE, CANCEL_REQUEST, ADD_FRIEND, REMOVE_FRIEND, 
  MESSAGE, ACCEPT_REQUEST, CANCEL_INVITATION} from '../../helpers/constants'
import { UsersStore, getters, mutations, initDataUser } from './user.helpers';
import api from '../../../api/api';
import { getId } from '../../helpers/helpers';

export const userListData: Module<UsersStore, State> = {
  namespaced: true,
  state: {
    userList: {},
    userData: INIT_USER,
    isShowSettings: false,
    nameSettings: NAME_SETTINGS,
    userNameList: [],
  },
  mutations: mutations,
  getters: getters,

  actions: {
    async initApp({ commit, state, dispatch }) {
      let id = document.cookie.slice(3);
      await initDataUser(state);
      store.dispatch('channelData/initChannelData');
      store.dispatch('messageListData/automaticUpdate');
      commit('automaticLogOut');
      dispatch('automaticUpdate');
      if (id) {
        commit('setUserData', id);
      } else {
        router.push(PATH_AUTHORIZATION)
      }
    },
    setId({ commit }, event: any) {
      let id = event.target.closest('.user-item')?.dataset?.id;
      document.cookie = `id=${id}`;
      commit('setUserData', id);
    }, 
    [LOG_OUT]({ state }) {
      state.userData.isOnline = false;
      document.cookie="id=";
      router.push(PATH_AUTHORIZATION);
      api.users.updateUser(state.userData);
    }, 
    [EDIT_PROFILE]({ state }) {
      store.state.editProfile.values = state.userData;
      store.state.editProfile.userName = state.userData.userName;
      router.push(PATH_EDIT_PROFILE);
    },
    [DELETE_PROFILE]({ dispatch, state }) {
      dispatch(LOG_OUT);
      api.users.deleteUser(state.userData.id);
      delete state.userList[state.userData.id];
    }, 
    setFunction({ dispatch }, name: string) {
      store.commit('messageListData/resetMessage');
      resetInputMessage(store.state.inputMessage);
      dispatch(name);
    },
    [MESSAGE]({ state }, id: string) {
      store.state.inputMessage.addressee = '@' + (state.userList[id]?.userName || '');
      store.state.inputMessage.idAddressee = id;
    },
    [REMOVE_FRIEND]({ state }, id: string) {
      delete state.userList[id].friends[state.userData.id];
      delete state.userData.friends[id];
      api.users.updateUser(state.userData);
      api.users.updateUser(state.userList[id]);
    },
    [ADD_FRIEND]({ state }, id: string) {
      state.userList[id].friendRequests[state.userData.id] = true;
      api.users.updateUser(state.userList[id]);
    },
    [CANCEL_REQUEST]({ state }, id: string) {
      delete state.userData.friendRequests[id];
      api.users.updateUser(state.userData);
    },
    [ACCEPT_REQUEST]({ state, dispatch }, id: string) {
      state.userData.friends[id] = true;
      dispatch(CANCEL_REQUEST, id);
      state.userList[id].friends[state.userData.id] = true;
      api.users.updateUser(state.userList[id]);
    },
    [CANCEL_INVITATION]({ state }, id: string) {
      delete state.userList[id].friendRequests[state.userData.id];
      api.users.updateUser(state.userList[id]);
    },
    setFunctionProfile: ({ dispatch }, name: string) => {
      dispatch(name, store.state.profileData.profile.id);
    },
    addUser({ state }, data) {
      data.id = getId();
      state.userList[data.id] = data;
      state.userData = data;
      state.userData.isOnline = true;
      store.state.profileData.profile = state.userData;
      document.cookie = `id=${data.id}`;
      api.users.addUser(state.userData);
    },
    async automaticUpdate({ state, commit }) {
      setInterval(async () => {
        let id = document.cookie.slice(3);
        await initDataUser(state);
        if (id) {
          commit('setUserData', id);
        }
      }, 5000)
    }
  },
}