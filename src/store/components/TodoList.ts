import { CommentData, State, TodoData } from "../helpers/interfaceList";
import { makeAutoObservable } from "mobx";
import { todoList } from '../helpers/constants'

function splitUserName(userName: string): string {
  return userName.split(' ').slice(0,2).map((word) => word[0].toUpperCase()).join('');
}

function checkDataLength(data: Set<string>): Array<string> {
  let resultData = [...data];
  let length = resultData.length;
  if (length > 4) {
    resultData = resultData.slice(0,4);
    resultData.push(`+${length - 4}`)
  }
  return resultData;
}

function getTodoUsers(author: string, creator: string, comments: Array<CommentData>): Array<string> {
  let data: Set<string> = new Set();
  data.add(splitUserName(author));
  data.add(splitUserName(creator));
  comments.forEach((comment) => data.add(splitUserName(comment.userName)));
  let checkedData = checkDataLength(data);
  return checkedData;
}

function checkProgress(progress: string): boolean {
  return progress === 'Pending' || progress === 'In Progress';
}

class TodoList {
  main: State;
  todoList = todoList;
  idActiveButton = '';

  constructor(main: State) {
    makeAutoObservable(this);
    this.main = main;
    this.changeIdActiveButton = this.changeIdActiveButton.bind(this);
    this.resetIdActiveButton = this.resetIdActiveButton.bind(this);
  }

  getTodoList(isActive: boolean): Array<TodoData> {
    if (isActive) {
      return this.todoList.filter((todo) => checkProgress(todo.progress))
    } else {
      return this.todoList.filter((todo) => !checkProgress(todo.progress))
    }
  }

  getTodoUsers(author: string, creator: string, comments: Array<CommentData>): Array<string> {
    return getTodoUsers(author, creator, comments);
  }

  progressClass(progress: string): string {
    return `todo__progress todo__progress_${progress.toLowerCase().split(' ').join('-')}`;
  }

  statusClass(status: string): string {
    return `todo__status todo__status_${status.toLowerCase()}`;
  }

  resetIdActiveButton(event: Event) {
    let classes = (event.target as Element).classList;
    let isButton = classes.contains('todo__button') || classes.contains('button-list__item');
    if (!isButton) {
      this.idActiveButton = '';
      window.removeEventListener('click', this.resetIdActiveButton);
    }
  }
  
  changeIdActiveButton(id: string) {
    if (this.idActiveButton !== id) {
      this.idActiveButton = id;
      window.addEventListener('click', this.resetIdActiveButton);
    } else {
      window.removeEventListener('click', this.resetIdActiveButton);
      this.idActiveButton = '';
    }
  }

  setTodoList(data: Array<TodoData>) {
    this.todoList = data;
  }
}

export default TodoList;