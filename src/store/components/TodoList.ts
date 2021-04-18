import { State, Comment, Todo } from '../helpers/interfaceList'

let stateData:State;

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

function getTodoUsers(author: string, creator: string, comments: Array<Comment>): Array<string> {
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

function getTodoList(state: State, isActive: boolean): Array<Todo> {
  stateData = state
  if (isActive) {
    return state.todoList.filter((todo) => checkProgress(todo.progress))
  } else {
    return state.todoList.filter((todo) => !checkProgress(todo.progress))
  }
}

function resetIdActiveButton(event: Event) {
  let classes = (<HTMLInputElement>event.target).classList;
  let isButton = classes.contains('todo__button') || classes.contains('button-list__item');
  if (!isButton) {
    stateData.idActiveButton = '';
    window.removeEventListener('click', resetIdActiveButton);
  }
}

function changeIdActiveButton(state: State, id: string) {
  if (state.idActiveButton !== id) {
    state.idActiveButton = id;
    window.addEventListener('click', resetIdActiveButton);
  } else {
    window.removeEventListener('click', resetIdActiveButton);
    state.idActiveButton = '';
  }
}

export { changeIdActiveButton, resetIdActiveButton, getTodoList, getTodoUsers }