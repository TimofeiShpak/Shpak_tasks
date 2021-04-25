import { makeAutoObservable } from "mobx";

import Search from './components/Search'
import TodoList from './components/TodoList';
import User from './components/User';
import Todo from './components/Todo';
import Comment from './components/Comment';
import Action from "./components/Action";
import api from "../api/api";
import { PROGRESS_LIST, STATUS_LIST } from "./helpers/constants";

class Store {
  todo: Todo;
  todoList: TodoList;
  search: Search;
  user: User;
  comment: Comment;
  action: Action;
  isLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
    this.search = new Search(this);
    this.todoList = new TodoList(this);
    this.user = new User(this);
    this.todo = new Todo(this);
    this.comment = new Comment(this);
    this.action = new Action(this);
  }

  changeIsLoading(value: boolean) {
    this.isLoading = value;
  }

  async initApp() {
    let userList = await api.userList.getList();
    this.user.setUserList(userList);
    let todoList = await api.todo.getList();
    let actionList = await api.actionList.getList();
    let userNameList = this.user.userList.map((user) => user.userName);
    this.user.lists = { progress: PROGRESS_LIST, status: STATUS_LIST, creator: userNameList }
    setTimeout(() => this.changeIsLoading(false), 1000);
    this.user.checkLogIn();
    this.action.setActionList(actionList);
    this.todoList.setTodoList(todoList);
  }
}

let store = new Store();
export default store;