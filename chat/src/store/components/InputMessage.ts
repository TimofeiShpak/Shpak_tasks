import { Module } from 'vuex'
import { closeSmiles, State, store } from '../store';
import { SMILES, HEIGHT_INPUT} from '../helpers/constants'
import { getId } from '../helpers/helpers';
import api from '../../api/api';

export interface InputMessageStore {
  value: string,
  isShowSmiles: boolean,
  height: string,
  addressee: string,
  idAddressee: string,
}

function createMessage(state: InputMessageStore) {
  let userData = store.state.userListData.userData;
  return {
    date: `${new Date().toLocaleDateString()}`,
    author: userData.fullName,
    userName: userData.userName,
    addressee: state.addressee,
    idAddressee: state.idAddressee,
    id: getId(),
    time: `${new Date().toLocaleTimeString().slice(0,-3)}`,
    text: state.value.trim().replace(/\n+/g, '\n'),
    avatarSrc: userData.src,
    idUser: userData.id,
    isEdit: false,
  }
}

export function resetInputMessage(state: InputMessageStore) {
  state.value = '';
  state.addressee = '';
  state.idAddressee = '';
  state.height = HEIGHT_INPUT;
}

function addMessage(state: InputMessageStore) {
  if (state.value.trim()) {
    let message = createMessage(state);
    let channel = store.state.channelData.channel;
    store.dispatch('messageListData/addMessage', message);
    resetInputMessage(state);
    api.messages.addMessage(channel, message);
  }
}

export const inputMessage: Module<InputMessageStore, State> = {
  namespaced: true,

  state: {
    value: '',
    isShowSmiles: false,
    height: HEIGHT_INPUT,
    addressee: '',
    idAddressee: '',
  },

  mutations: {
    updateInputValue(state, event) {
      if (event.target.value.slice(-1) === '\n') {
        event.preventDefault();
      }
      state.value = event.target.value;
      state.height = `${event.target.scrollHeight}px`; 
    },
    changeShowSmiles(state, event) {
      let isSmile = event.target.closest('.smiles__list');
      if (!isSmile) {
        state.isShowSmiles = !state.isShowSmiles;
        if (state.isShowSmiles) {
          document.addEventListener('click', closeSmiles);
        } else {
          document.removeEventListener('click', closeSmiles)
        }
      }
    },
    handleMessage(state) {
      document.addEventListener('keydown', (event) => {
        if (event.code === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          if (!event.repeat) {
            addMessage(state);
          }
        }
      });
    }
  },

  getters: {
    smiles(state: InputMessageStore) {
      return SMILES.map((smile) => {
        let id = getId();
        let onClick = () => state.value += `${smile}`;
        return { id, onClick, text: smile }
      });
    }
  }
}