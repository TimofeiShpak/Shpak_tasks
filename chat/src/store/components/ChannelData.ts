import { Module } from 'vuex'
import api from '../../api/api';
import { State, store } from '../store';

export interface Channel {
  name: string,
  id: string,
}

export interface ChannelStore {
  channelList: Array<Channel>,
  channel: string,
}

export const channelData: Module<ChannelStore, State> = {
  namespaced: true,
  state: {
    channelList: [],
    channel: '',
  },

  actions: {
    setChannel({ state }, channel) {
      state.channel = channel;
      store.dispatch('messageListData/setMessages', channel);
    },
    async initChannelData({ state }) {
      let data = await api.channels.getChannels();
      state.channelList = data;
      state.channel = data[0].name;
      store.dispatch('messageListData/setMessages', data[0].name);
    }
  }
}
