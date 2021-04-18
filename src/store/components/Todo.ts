import { State } from '../helpers/interfaceList'
import { getId } from '../helpers/helpers'
import { INIT_TODO } from '../helpers/constants'

function resetState(state: State) {
  state.newTodo = INIT_TODO.slice();
  state.newTodo.push(state.userData.userName);
  state.idEdit = '';
}

function saveTodo(commit: Function, state: State) {
  commit('changeVisibilityEditTodo');
  if (!state.idEdit) {
    commit('addTodo');
  } else {
    commit('editTodo');
  }
}

function editTodo(state: State) {
  let todoIndex = state.todoList.findIndex((todo) => todo.id === state.idEdit);
  let { newTodo, todoList } = state;
  let data = { 
    text: newTodo[0], 
    progress: newTodo[1], 
    status: newTodo[2], 
    creator: newTodo[3] 
  }
  state.todoList[todoIndex] = {
    ...todoList[todoIndex], 
    ...data
  }
  resetState(state);
}

function createTodo(state: State) {
  let todo = {
    text: state.newTodo[0],
    progress: state.newTodo[1],
    status: state.newTodo[2],
    id: getId(),
    isCompleted: false,
    author: state.userData.userName,
    creator: state.newTodo[3],
    comments: [],
  }
  state.todoList.push(todo);
  resetState(state);
}

export { saveTodo, editTodo, createTodo, resetState }