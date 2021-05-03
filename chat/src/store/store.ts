import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import { channelData, ChannelStore } from './components/ChannelData'

import { messageListData, MessageListStore } from './components/MessageListData'
import { inputMessage, InputMessageStore } from './components/InputMessage'
import { profileData, ProfileStore } from './components/ProfileData'
import { search, SearchStore } from './components/Search'
import { EditProfileStore, editProfile } from './components/EditProfile'
import { UsersStore } from './components/users/user.helpers'
import { userListData } from './components/users/userListData'

export interface State {
  channelData: ChannelStore,
  userListData: UsersStore,
  messageListData: MessageListStore,
  inputMessage: InputMessageStore,
  profileData: ProfileStore,
  search: SearchStore,
  editProfile: EditProfileStore,
}

export function closeSettings(event: any) {
  let isSettings = event.target.className.includes('settings');
  if (!isSettings) {
    store.state.userListData.isShowSettings = false;
    document.removeEventListener('click', closeSettings);
  }
}

export function closeSmiles(event: any) {
  let isSmiles = event.target.className.includes('smiles');
  if (!isSmiles) {
    store.state.inputMessage.isShowSmiles = false;
    document.removeEventListener('click', closeSmiles);
  }
}

export const store = createStore<State>({
  modules: {
    userListData,
    channelData,
    messageListData,
    inputMessage,
    profileData,
    search,
    editProfile,
  },
})

export const key: InjectionKey<Store<State>> = Symbol()

export function useStore () {
  return baseUseStore(key)
}