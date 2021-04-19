import { State } from '../helpers/interfaceList'
import { getId } from '../helpers/helpers'
import { addAction } from './Action';
import api from '../../api/api';

function createComment(state: State) {
  let { userName, userSrc } = state.userData;
  let todoIndex = state.todoList.findIndex((todo) => todo.id === state.idEdit);
  let taskName = state.todoList[todoIndex].text;
  let comment = {
    userName: userName,
    userSrc: userSrc,
    id: getId(),
    time: `${new Date()}`,
    text: state.comment,
    taskName: taskName,
  }
  let todo = state.todoList[todoIndex];
  state.todoList[todoIndex].comments.push(comment);
  addAction(state, comment, 'Comment task', 'comment');
  state.comment = '';
  api.todo.edit(todo);
}

export { createComment }