import router from "../../router/router";
import { INIT_USER_DATA, PROGRESS_LIST, STATUS_LIST } from "../helpers/constants";
import { State } from "../helpers/interfaceList";
import api from '../../api/api';

function checkLogIn(commit: Function) {
  let id = document.cookie.slice(3);
  if (id) {
    commit('setUserData', id);
  } else {
    router.push('./authorization');
  }
}

function logOut(state: State) {
  state.userData = Object.assign({}, INIT_USER_DATA);
  router.push('./authorization');
  document.cookie = 'id=';
}

function setUserData(state: State, id: string) {
  let user = state.userList.find((user) => user.id === id);
  state.userData = Object.assign({}, user);
  document.cookie = `id=${id}`;
  state.newTodo.push(state.userData.userName);
  router.push('./home');
}

async function initApp(commit: Function, state: State) {
  state.userList = await api.userList.getList();
  state.todoList = await api.todo.getList();
  state.actionList = await api.actionList.getList();
  state.lists = [PROGRESS_LIST, STATUS_LIST, state.userList.map((user) => user.userName)]
  setTimeout(() => state.isLoading = false, 1000);
  checkLogIn(commit);
}

export { checkLogIn, logOut, setUserData, initApp }
