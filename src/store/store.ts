import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import { State, Comment } from './helpers/interfaceList'
import { getTime } from './helpers/helpers'
import { INIT_TODO, INPUT_LIST_DATA, PROGRESS_LIST, STATUS_LIST, INIT_USER_DATA,
  INIT_SEARCH } from './helpers/constants'

import { saveTodo, editTodo, createTodo, resetState } from './components/Todo'
import { changeIdActiveButton, getTodoList, getTodoUsers } from './components/TodoList'
import { createComment } from './components/Comment'
import { checkLogIn, logOut, setUserData } from './components/User'
import { searchTodo, nextResult, prevResult, updateSearchText } from './components/Search'

import { userList, actionList, todoList, } from './dataBase'

export const store = createStore<State>({
  state: {
    userData: Object.assign({}, INIT_USER_DATA), 
    todoList: todoList,
    actionList: actionList,
    isLoading: false,
    isShowEditTodo: false,
    isShowComments: false,
    INPUT_LIST_DATA: INPUT_LIST_DATA,
    userList: userList,
    newTodo: INIT_TODO.slice(),
    lists: [PROGRESS_LIST, STATUS_LIST, userList.map((user) => user.userName)],
    idActiveButton: '',
    idEdit: '',
    comments: [],
    comment: '',
    search: Object.assign({}, INIT_SEARCH),
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
    addTodo(state) {
      createTodo(state);
    },
    changeIdActiveButton(state, id) {
      changeIdActiveButton(state, id);
    },
    changeStateTodo(state, { data, id }) {
      state.newTodo = data;
      state.idEdit = id;
    },
    editTodo(state) {
      editTodo(state);
    },
    changeVisibilityComments(state) {
      state.isShowComments = !state.isShowComments;
    },
    changeStateComments(state, { comments, id }) {
      state.idEdit = id;
      state.comments = comments;
    },
    deleteTodo(state, id) {
      let indexTodo = state.todoList.findIndex((todo) => todo.id === id);
      state.todoList.splice(indexTodo, 1);
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
    }
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
    checkLogIn({ commit }) {
      checkLogIn(commit);
    },
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
    }
  },
})

export const key: InjectionKey<Store<State>> = Symbol()

export function useStore () {
  return baseUseStore(key)
}