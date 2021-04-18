import router from "../../router/router";
import { INIT_USER_DATA } from "../helpers/constants";
import { State } from "../helpers/interfaceList";

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
}

export { checkLogIn, logOut, setUserData }
