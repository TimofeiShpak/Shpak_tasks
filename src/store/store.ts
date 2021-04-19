import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import { State, Comment, EditedOption } from './helpers/interfaceList'
import { getTime } from './helpers/helpers'
import { INIT_TODO, INPUT_LIST_DATA, INIT_USER_DATA, INIT_SEARCH } from './helpers/constants'

import { saveTodo, resetState, deleteTodo } from './components/Todo'
import { changeIdActiveButton, getTodoList, getTodoUsers } from './components/TodoList'
import { createComment } from './components/Comment'
import { initApp, logOut, setUserData } from './components/User'
import { searchTodo, nextResult, prevResult, updateSearchText } from './components/Search'

export const store = createStore<State>({
  state: {
    userData: Object.assign({}, INIT_USER_DATA), 
    todoList: [],
    actionList: [],
    isLoading: true,
    isShowEditTodo: false,
    isShowComments: false,
    INPUT_LIST_DATA: INPUT_LIST_DATA,
    userList: [],
    newTodo: INIT_TODO.slice(),
    lists: [],
    idActiveButton: '',
    idEdit: '',
    comments: [],
    comment: '',
    search: Object.assign({}, INIT_SEARCH),
    editedOptionList: []
  },

  mutations: {
    setUserData(state, id) {
      setUserData(state, id);
    },
    logOut(state) {
      logOut(state);
    },
    changeVisibilityEditTodo(state) {
      state.isShowEditTodo = !state.isShowEditTodo;
    },
    updateNewTodo(state, payload) {
      state.newTodo[payload.index] = payload.event.target.value;
    },
    changeIdActiveButton(state, id) {
      changeIdActiveButton(state, id);
    },
    changeStateTodo(state, { data, id }) {
      state.newTodo = data;
      state.idEdit = id;
    },
    changeVisibilityComments(state) {
      state.isShowComments = !state.isShowComments;
    },
    changeStateComments(state, { comments, id }) {
      state.idEdit = id;
      state.comments = comments;
    },
    deleteTodo(state, id) {
      deleteTodo(state, id);
    }, 
    updateComment(state, event) {
      state.comment = event.target.value;
    },
    addComment(state) {
      createComment(state);
    },
    updateSearchText(state, event) {
      updateSearchText(state, event);
    },
    searchTodo(state) {
      searchTodo(state);
    },
    nextResult(state) {
      nextResult(state);
    }, 
    prevResult(state) {
      prevResult(state);
    },
  },

  actions: {
    saveTodo({ commit, state}) {
      saveTodo(commit, state);
    },
    openEditTodo({ commit }, payload) {
      commit('changeVisibilityEditTodo');
      commit('changeStateTodo', payload);
    },
    closeEditTodo({ commit, state }) {
      commit('changeVisibilityEditTodo');
      resetState(state);
    },
    openComments({ commit }, payload) {
      commit('changeVisibilityComments');
      commit('changeStateComments', payload)
    },
    closeComments({ commit, state }) {
      commit('changeVisibilityComments');
      resetState(state);
    },
    async initApp({ commit, state }) {
      initApp(commit, state);
    }
  },

  getters: {
    todoList: (state) => (isActive: boolean) => {
      return getTodoList(state, isActive);
    },
    todoUsers: () => (author: string, creator: string, comments: Array<Comment>) => {
      return getTodoUsers(author, creator, comments);
    },
    progressClass: () => (progress: string) => {
      return `todo__progress_${progress.toLowerCase().split(' ').join('-')}`;
    },
    statusClass: () => (status: string) => {
      return `todo__status_${status.toLowerCase()}`;
    },
    time: () => (time: string) => {
      return getTime(time);
    },
    resultText: (state) => {
      return `${state.search.index + 1}/${state.search.resultSearch.length}`;
    },
    optionName: () => (option: EditedOption) => {
      return option.name === 'text' ? 'description' : option.name;
    },
  },
})

export const key: InjectionKey<Store<State>> = Symbol()

export function useStore () {
  return baseUseStore(key)
}