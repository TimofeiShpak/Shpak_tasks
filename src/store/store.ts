import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

interface Comment {
  userName: string,
  text: string
}
export interface Todo {
  text: string,
  progress: string,
  status: string,
  id: string,
  isCompleted: boolean,
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
}

export interface userData {
  userSrc: string,
  userName:string,
}

export interface InputData {
  name: string,
  id: string,
}

export interface State { 
  todoList: Array<Todo>,
  actionList: Array<Action>,
  userData: userData,
  isLoading: boolean,
  isShowEditTodo: boolean
  inputListData: Array<string>,
  userList: Array<userData>,
  newTodo: Array<string>,
  lists: Array<Array<string>>,
  idActiveButton: string,
  idEdit: string,
}

export function getId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
      return v.toString(16);
  });
}

let todoList = [
  {
    text: 'Evaluate the addition and deletion of user IDs.',
    progress: 'Pending',
    status: 'Minor',
    id: getId(),
    isCompleted: false,
    author: 'Amelia Luna',
    creator: 'Chance Rhiel',
    comments: [
      {
        userName: 'Alena Curtis', text: 'Amazing! Great work. 🥰 Keep it up, bro'
      },
      {
        userName: 'Orlando Dig', text: 'I like this'
      },
      {
        userName: 'Carmen Velasco', text: 'Do you think you will have time?'
      },
      {
        userName: 'Marie Jensen', text: 'It is very nice!'
      }
    ],
  },
  {
    text: 'Identify the implementation team.',
    progress: 'In Progress',
    status: 'Normal',
    id: getId(),
    isCompleted: false,
    author: 'Amelia Luna',
    creator: 'Alena Curtis',
    comments: [],
  },
  {
    text: 'Batch schedule download/process.',
    progress: 'Pending',
    status: 'Critical',
    id: getId(),
    isCompleted: false,
    author: 'Amelia Luna',
    creator: 'Amelia Luna',
    comments: [],
  },
  {
    text: 'Monitor system performance and adjust hardware.',
    progress: 'Pending',
    status: 'Minor',
    id: getId(),
    isCompleted: false,
    author: 'Amelia Luna',
    creator: 'Alena Curtis',
    comments: [],
  },
  {
    text: 'Install console machines and prerequisite software.',
    progress: 'Completed',
    status: 'Critical',
    id: getId(),
    isCompleted: true,
    author: 'Amelia Luna',
    creator: 'Alena Curtis',
    comments: [],
  },
  {
    text: 'Design a relatively simple business system',
    progress: 'Pending',
    status: 'Critical',
    id: getId(),
    isCompleted: true,
    author: 'Amelia Luna',
    creator: 'Alena Curtis',
    comments: [],
  },
  {
    text: 'Define users and workflow',
    progress: 'Cancelled',
    status: 'Minor',
    id: getId(),
    isCompleted: true,
    author: 'Amelia Luna',
    creator: 'Alena Curtis',
    comments: [],
  }
];

let actionList = [
  {
    userSrc: 'src/assets/icons/avatar2.svg',
    userName: 'Alena Curtis',
    time: 'Just Now',
    text: 'Planning for new event at Sydney room for new project on',
    id: getId(),
    subtext: '14:00 PM'
  },
  {
    userSrc: 'src/assets/icons/avatar3.svg',
    userName: 'Amelia Luna',
    time: '1 hour ago',
    text: 'Attached new design file to',
    id: getId(),
    subtext: 'Userflow'
  },
  {
    userSrc: 'src/assets/icons/avatar4.svg',
    userName: 'Chance Rhiel',
    time: '2 hour ago',
    text: 'Comment on your task',
    id: getId(),
    subtext: 'UI Design',
    comment: 'Amazing! Great work. 🥰 Keep it up, bro'
  }
];

let userData = {
  userSrc: 'src/assets/icons/avatar1.svg',
  userName: 'Carmen Velasco',
}

let inputListData = ['author', 'description', 'progress', 'status', 'creator'];

let userList = [
  { userName: 'Carmen Velasco', userSrc: 'src/assets/icons/avatar1.svg', id: getId() },
  { userName: 'Alena Curtis', userSrc: 'src/assets/icons/avatar2.svg', id: getId() },
  { userName: 'Amelia Luna', userSrc: 'src/assets/icons/avatar3.svg', id: getId() },
  { userName: 'Chance Rhiel', userSrc: 'src/assets/icons/avatar4.svg', id: getId() },
]

let initTodo = ['', 'In Progress', 'Normal'];
let progressList = ['In Progress','Pending','Completed','Canceled'];
let statusList = ['Normal','Minor','Critical'];

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

function createTodo(state: State): Todo {
  return {
    text: state.newTodo[0],
    progress: state.newTodo[1],
    status: state.newTodo[2],
    id: getId(),
    isCompleted: false,
    author: state.userData.userName,
    creator: state.newTodo[3],
    comments: [],
  }
}

function getTodoList(state: State, isActive: boolean) {
  if (isActive) {
    return state.todoList.filter((todo) => !todo.isCompleted)
  } else {
    return state.todoList.filter((todo) => todo.isCompleted)
  }
}

function resetIdActiveButton(event: any) {
  let classes = event.target.classList;
  let isButton = classes.contains('todo__button') || classes.contains('button-list__item');
  if (!isButton) {
    store.state.idActiveButton = '';
    window.removeEventListener('click', resetIdActiveButton);
  }
}

function changeIdActiveButton(state: State, id: string) {
  if (state.idActiveButton !== id) {
    state.idActiveButton = id;
    window.addEventListener('click', resetIdActiveButton);
  } else {
    state.idActiveButton = '';
  }
}

function resetState(state: State) {
  state.newTodo = initTodo.slice();
  state.newTodo.push(store.state.userData.userName);
  state.idEdit = '';
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

export const store = createStore<State>({
  state: {
    userData: { userName: '', userSrc: '' }, 
    todoList: todoList,
    actionList: actionList,
    isLoading: false,
    isShowEditTodo: false,
    inputListData: inputListData,
    userList: userList,
    newTodo: initTodo.slice(),
    lists: [progressList, statusList, userList.map((user) => user.userName)],
    idActiveButton: '',
    idEdit: '',
  },
  mutations: {
    changeVisibilityEditTodo(state) {
      state.isShowEditTodo = !state.isShowEditTodo;
    },
    updateNewTodo(state, payload) {
      state.newTodo[payload.index] = payload.event.target.value;
    },
    setUserData(state) {
      state.userData = userData;
      state.newTodo.push(userData.userName);
    },
    addTodo(state) {
      let todo = createTodo(state);
      state.todoList.push(todo);
      resetState(state);
    },
    changeIdActiveButton(state, id) {
      changeIdActiveButton(state, id);
    },
    changeState(state, { data, id }) {
      state.newTodo = data;
      state.idEdit = id;
    },
    editTodo(state) {
      editTodo(state);
    }
  },
  actions: {
    saveTodo({ commit, state }) {
      commit('changeVisibilityEditTodo');
      if (!state.idEdit) {
        commit('addTodo');
      } else {
        commit('editTodo');
      }
    },
    openEditTodo({ commit }, { id, data }) {
      commit('changeVisibilityEditTodo');
      commit('changeState', { id, data });
    }
  },
  getters: {
    todoList: (state) => (isActive: boolean) => {
      return getTodoList(state, isActive);
    },
    getTodoUsers: () => (author: string, creator: string, comments: Array<Comment>) => {
      return getTodoUsers(author, creator, comments);
    },
    progressClass: () => (progress: string) => {
      return `todo__progress_${progress.toLowerCase().split(' ').join('-')}`;
    },
    statusClass: () => (status: string) => {
      return `todo__status_${status.toLowerCase()}`;
    }
  },
})

export const key: InjectionKey<Store<State>> = Symbol()

export function useStore () {
  return baseUseStore(key)
}