import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface Todo {
  text: string,
  progress: string,
  status: string,
  id: string,
  isCompleted: boolean
}

export interface Action {
  userSrc: string,
  userName: string,
  time: string,
  text: string,
  subtext: string
}

export interface userData {
  userSrc: string,
}

export interface State { 
  todoList: Array<Todo>,
  actionList: Array<Action>,
  userData: userData
}

function getId(): string {
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
  },
  {
    text: 'Identify the implementation team.',
    progress: 'In Progress',
    status: 'Normal',
    id: getId(),
    isCompleted: false,
  },
  {
    text: 'Batch schedule download/process.',
    progress: 'Pending',
    status: 'Critical',
    id: getId(),
    isCompleted: false,
  },
  {
    text: 'Monitor system performance and adjust hardware.',
    progress: 'Pending',
    status: 'Minor',
    id: getId(),
    isCompleted: false,
  },
  {
    text: 'Install console machines and prerequisite software.',
    progress: 'Completed',
    status: 'Critical',
    id: getId(),
    isCompleted: true,
  },
  {
    text: 'Design a relatively simple business system',
    progress: 'Pending',
    status: 'Critical',
    id: getId(),
    isCompleted: true,
  },
  {
    text: 'Define users and workflow',
    progress: 'Cancelled',
    status: 'Minor',
    id: getId(),
    isCompleted: true,
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
    subtext: 'UI Design'
  }
];

let userData = {
  userSrc: 'src/assets/icons/avatar1.svg'
}

export const store = createStore<State>({
  state: {
    userData: userData, 
    todoList: todoList,
    actionList: actionList
  },
  mutations: {
   
  },
  actions: {
   
  },
  getters: {
    todoList: (state) => (isActive: boolean) => {
      if (isActive) {
        return state.todoList.filter((todo) => !todo.isCompleted)
      } else {
        return state.todoList.filter((todo) => todo.isCompleted)
      }
    }
  }
})

export const key: InjectionKey<Store<State>> = Symbol()

export function useStore () {
  return baseUseStore(key)
}