import { Module } from "vuex";
import router from "../../router/router";
import { OPTIONS, REQUIRED_OPTIONS, INIT_USER, PATH_HOME } from "../helpers/constants";
import { User } from "./users/user.helpers";
import { State, store } from "../store";
import api from "../../api/api";

export interface EditProfileStore {
  values: User,
  options: Array<string>,
  isWrong: boolean,
  userName: string,
}

function getInputData(state: EditProfileStore, option: string) {
  let isRequired = REQUIRED_OPTIONS.includes(option);
  let value = state.values[option];
  return {
    option: option,
    value: value,
    required: isRequired
  }
}

export const editProfile: Module<EditProfileStore, State> = {
  namespaced: true,

  state: {
    values: Object.assign({}, INIT_USER),
    options: OPTIONS,
    isWrong: false,
    userName: '',
  },

  mutations: {
    onInput(state, { event, option }) {
      state.values[option] = event.target.value;
    },
    checkIsWrong(state) {
      let userName = state.values.userName;
      let isIncluded = store.state.userListData.userNameList.includes(userName);
      state.isWrong = isIncluded && state.userName !== userName;
    },
  },

  actions: {
    save({ state, commit }, isNew) {
      commit('checkIsWrong');
      if (!state.isWrong) {
        if (isNew) {
          store.dispatch('userListData/addUser', state.values);
        } else {
          let index = store.state.userListData.userNameList.indexOf(state.userName);
          if (index > -1) {
            store.state.userListData.userNameList.splice(index, 1);
          }
          api.users.updateUser(state.values);
        }
        router.push(PATH_HOME);
        state.values = Object.assign({}, INIT_USER);
      }
    }
  },

  getters: {
    inputElements(state) {
      return OPTIONS.map((option) => getInputData(state, option));
    },
    title: () => (isNew: string) => {
      return isNew ? 'Register new user' : 'Change user'
    } 
  }
}