export interface Comment {
  userName: string,
  text: string,
  userSrc: string,
  id: string,
  time: string,
  taskName: string,
}

export interface Todo {
  [key: string]: any,
  text: string,
  progress: string,
  status: string,
  id: string,
  author: string,
  creator: string,
  comments: Array<Comment>
}

export interface Action {
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

export interface State { 
  todoList: Array<Todo>,
  actionList: Array<Action>,
  userData: userData,
  isLoading: boolean,
  isShowEditTodo: boolean
  INPUT_LIST_DATA: Array<string>,
  userList: Array<userData>,
  newTodo: Array<string>,
  lists: Array<Array<string>>,
  idActiveButton: string,
  idEdit: string,
  isShowComments: boolean,
  comments: Array<Comment>,
  comment: string,
  search: Search,
  editedOptionList: Array<EditedOption>
}