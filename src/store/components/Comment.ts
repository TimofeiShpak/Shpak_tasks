import { State } from '../helpers/interfaceList'
import { getId } from '../helpers/helpers'

function createComment(state: State) {
  let { userName, userSrc } = state.userData;
  let todoIndex = state.todoList.findIndex((todo) => todo.id === state.idEdit);
  let comment = {
    userName: userName,
    userSrc: userSrc,
    id: getId(),
    time: new Date(),
    text: state.comment,
  }
  state.todoList[todoIndex].comments.push(comment);
  state.comment = '';
}

export { createComment }