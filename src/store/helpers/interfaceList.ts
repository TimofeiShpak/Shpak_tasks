import Action from "../components/Action";
import Todo from "../components/Todo";
import TodoList from "../components/TodoList";
import User from "../components/User";
import Comment from '../components/Comment'

export interface CommentData {
  userName: string,
  text: string,
  userSrc: string,
  id: string,
  time: string,
  taskName: string
}

export interface TodoData {
  [key: string]: string | number | Array<CommentData>;
  text: string,
  progress: string,
  status: string,
  id: string,
  author: string,
  creator: string,
  comments: Array<CommentData>
}

export interface ActionData {
  userSrc: string,
  userName: string,
  time: string,
  text: string,
  subtext: string,
  comment?: string,
  id: string,
  editedOptionList?: Array<EditedOption>
}

export interface userData {
  userSrc: string,
  userName: string,
  id: string,
}

export interface InputData {
  name: string,
  id: string,
}

export interface Search {
  searchText: string,
  resultSearch: Array<HTMLElement>,
  index: number,
  oldText: string,
  isSearch: boolean,
}

export interface EditedOption {
  name: string,
  value: string,
}

export interface InitTodo {
  [key: string]: string,
  text: string,
  progress: string,
  status: string,
  creator: string,
}

export interface State { 
  search: Search,
  user: User,
  todo: Todo,
  todoList: TodoList,
  action: Action,
  comment: Comment
}

export interface Lists {
  [key: string]: Array<string>,
  progress: Array<string>,
  status: Array<string>,
  creator: Array<string>,
}