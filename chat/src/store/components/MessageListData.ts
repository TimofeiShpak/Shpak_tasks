import { Module } from 'vuex'
import { USER_CLASSES, INTERACTIVE_CLASSES } from '../helpers/constants'
import { State, store } from '../store';
import { getDate, getYesterday } from '../helpers/helpers'
import api from '../../api/api';

export interface Message {
  date: string,
  author: string,
  userName: string,
  addressee: string,
  idAddressee: string,
  id: string,
  time: string,
  text: string,
  avatarSrc: string,
  idUser: string,
  isEdit: boolean,
  show?: string,
}

export interface MessageListStore {
  messageList: Array<Message>,
  idActive: string,
  idEdit: '',
  textEdit: '',
}

function getData(messageList: Array<Message>) {
  let today = `${new Date().toLocaleDateString()}`;
  let yesterday = `${getYesterday()}`;
  let saveDate = '';
  return messageList.map((message) => {
    let dataUser = store.state.userListData.userList[message.idUser];
    let dataAddressee = store.state.userListData.userList[message.idAddressee];
    let date = message.date;
    message.show = getDate(date, yesterday, today, saveDate);
    message.author = dataUser?.fullName || 'no name';
    message.userName = dataUser?.userName || 'no userName';
    if (dataAddressee) {
      message.addressee = dataAddressee.userName;
    }
    saveDate = date;
    return message;
  });
}

function changeActive(state: MessageListStore, id: string) {
  state.idActive = state.idActive === id ? '' : id;
}

function handleClick(state: MessageListStore, event: any) {
  let className = event.target.className;
  let dataset = event.target.closest('.message-wrapper')?.dataset;
  if (USER_CLASSES.includes(className)) {
    store.commit('profileData/setProfile', dataset.iduser);
  } else if (!INTERACTIVE_CLASSES.includes(className) && !state.idEdit) {
    changeActive(state, dataset.id);
  }
}

export const messageListData: Module<MessageListStore, State> = {
  namespaced: true,
  
  state: {
    messageList: [],
    idActive: '',
    idEdit: '',
    textEdit: '',
  },

  mutations: {
    resetMessage(state) {
      state.idEdit = '';
      state.textEdit = '';
      state.idActive = '';
    }
  },

  actions: {
    click({ state }, event) {
      handleClick(state, event);
    }, 
    deleteMessage({ state }, id) {
      let index = state.messageList.findIndex((message) => message.id === id);
      let channel = store.state.channelData.channel;
      state.messageList.splice(index, 1);
      api.messages.deleteMessage(channel, id);
    },
    editMessage({ state }, { id, text }) {
      state.idEdit = id;
      state.textEdit = text;
    }, 
    updateTextEdit({ state }, event) {
      state.textEdit = event.target.value;
    },
    saveMessage({ state, commit }) {
      let index = state.messageList.findIndex((message) => message.id === state.idEdit);
      let message = state.messageList[index];
      let channel = store.state.channelData.channel;
      let isEdit = message.text !== state.textEdit;
      if (isEdit) {
        message.isEdit = true;
        message.text = state.textEdit;
        api.messages.editMessage(channel, message);
      }
      commit('resetMessage');
    },
    async setMessages({ state }, name) {
      state.messageList = await api.messages.getMessages(name);
    },
    async automaticUpdate({ dispatch }) {
      setInterval(async () => {
        let channel = store.state.channelData.channel;
        dispatch('setMessages', channel);
      }, 5000);
    },
    addMessage({ state }, message) {
      state.messageList.push(message);
    }
  },

  getters: {
    data(state) {
      return getData(state.messageList);
    },
    isActive: (state) => (id: string) => {
      return id === state.idActive;
    },
  }
}