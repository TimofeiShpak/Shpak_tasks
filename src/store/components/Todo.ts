import { State } from '../helpers/interfaceList'
import { getId } from '../helpers/helpers'
import { INIT_TODO } from '../helpers/constants'
import { addAction } from './Action';
import api from '../../api/api';

function resetState(state: State) {
  state.newTodo = INIT_TODO.slice();
  state.newTodo.push(state.userData.userName);
  state.idEdit = '';
}

function saveTodo(commit: Function, state: State) {
  commit('changeVisibilityEditTodo');
  if (!state.idEdit) {
    createTodo(state)
  } else {
    editTodo(state);
  }
}

function editTodo(state: State) {
  let options = ['text', 'progress', 'status', 'creator'];
  let todoIndex = state.todoList.findIndex((todo) => todo.id === state.idEdit);
  let { newTodo, todoList } = state;
  let data = todoList[todoIndex];
  for (let i = 0; i < options.length; i++) {
    let option = options[i]
    if (data[option] !== newTodo[i]) {
      data[option] = newTodo[i]; 
      state.editedOptionList.push({ name: option, value: newTodo[i]})
    }
  }
  state.todoList[todoIndex] = data;
  addAction(state, data, 'Edit task', 'editTask');
  api.todo.edit(data);
  resetState(state);
}

function createTodo(state: State) {
  let todo = {
    text: state.newTodo[0],
    progress: state.newTodo[1],
    status: state.newTodo[2],
    id: getId(),
    author: state.userData.userName,
    creator: state.newTodo[3],
    comments: [],
  }
  addAction(state, todo, 'Create new task', 'addTask');
  state.todoList.push(todo);
  api.todo.add(todo);
  resetState(state);
}

function deleteTodo(state: State, id: string) {
  let indexTodo = state.todoList.findIndex((todo) => todo.id === id);
  let todo = state.todoList[indexTodo];
  addAction(state, todo, 'Delete task', 'deleteTask');
  state.todoList.splice(indexTodo, 1);
  api.todo.delete(id);
}

export { saveTodo, editTodo, createTodo, resetState, deleteTodo }