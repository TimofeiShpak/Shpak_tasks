import { EditedOption, InitTodo, State, TodoData } from '../helpers/interfaceList'
import { getId } from '../helpers/helpers'
import { INIT_TODO } from '../helpers/constants'
import { makeAutoObservable } from 'mobx';
import React from 'react';
import api from '../../api/api';

class Todo {
  main: State;
  newTodo: InitTodo = Object.assign({}, INIT_TODO);
  idEdit: string = '';
  isShowEdit: boolean = false;
  editedOptionList: Array<EditedOption> = [];

  constructor(main: State) {
    this.main = main;
    makeAutoObservable(this);
    this.changeShowEdit = this.changeShowEdit.bind(this);
    this.updateNewTodo = this.updateNewTodo.bind(this);
    this.saveTodo = this.saveTodo.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.openEditTodo = this.openEditTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.closeEditTodo = this.closeEditTodo.bind(this);
  }

  changeShowEdit() {
    this.isShowEdit = !this.isShowEdit;
  }

  updateNewTodo(event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>, key: string) {
    this.newTodo[key] = event.target.value;   
  }

  resetState() {
    let creator = this.main.user.userData.userName;
    this.newTodo = Object.assign({}, INIT_TODO, { creator });
    this.idEdit = '';
  }

  saveTodo(event: any) {
    event.preventDefault();
    this.changeShowEdit()
    if (!this.idEdit) {
      this.createTodo()
    } else {
      this.editTodo();
    }
  }

  openEditTodo(id: string, data: InitTodo) {
    this.changeShowEdit();
    this.idEdit = id;
    this.newTodo = data;
  }

  closeEditTodo() {
    this.changeShowEdit();
    this.resetState();
  }

  editTodo() {
    let options = ['text', 'progress', 'status', 'creator'];
    let todoList = this.main.todoList.todoList;
    let todoIndex = todoList.findIndex((todo: TodoData) => todo.id === this.idEdit);
    let data: TodoData = todoList[todoIndex];
    for (let option of options) {
      if (data[option] !== this.newTodo[option]) {
        data[option] = this.newTodo[option]; 
        let actionChange = { name: option, value: this.newTodo[option] };
        this.editedOptionList.push(actionChange);
      }
    }
    this.main.todoList.todoList[todoIndex] = data;
    this.main.action.addAction(data, 'Edit task', 'editTask');
    api.todo.edit(data);
    this.resetState();
  }

  createTodo() {
    let todo = {
      id: getId(),
      author: this.main.user.userData.userName,
      comments: [],
      ...this.newTodo,
    }
    if (!todo.creator) {
      todo.creator = this.main.user.userData.userName;
    } 
    this.main.action.addAction(todo, 'Create new task', 'addTask');
    this.main.todoList.todoList.push(todo);
    api.todo.add(todo);
    this.resetState();
  }

  deleteTodo(id: string) {
    let indexTodo = this.main.todoList.todoList.findIndex((todo) => todo.id === id);
    let todo = this.main.todoList.todoList[indexTodo];
    this.main.action.addAction(todo, 'Delete task', 'deleteTask');
    this.main.todoList.todoList.splice(indexTodo, 1);
    api.todo.delete(id);
  }
}

export default Todo;