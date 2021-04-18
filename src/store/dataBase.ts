import { getId } from './helpers/helpers'

let userList = [
  { userName: 'Carmen Velasco', userSrc: 'src/assets/icons/avatar1.svg', id: "45258924-94f7-4c8d-aca2-6fbe59f0feb5" },
  { userName: 'Alena Curtis', userSrc: 'src/assets/icons/avatar2.svg', id: "rt258924-94f7-4c8d-aca2-6fbe59f0feb5" },
  { userName: 'Amelia Luna', userSrc: 'src/assets/icons/avatar3.svg', id: "hj258924-94f7-4c8d-aca2-6fbe59f0feb5" },
  { userName: 'Chance Rhiel', userSrc: 'src/assets/icons/avatar4.svg', id: "34258924-94f7-4c8d-aca2-6fbe59f0feb5" },
  { userName: 'Orlando Dig', userSrc: 'src/assets/icons/avatar5.jpg', id: "de258924-94f7-4c8d-aca2-6fbe59f0feb5", }

]

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
        userName: 'Alena Curtis', 
        userSrc: 'src/assets/icons/avatar2.svg', 
        text: 'Amazing! Great work. 🥰 Keep it up, bro', 
        id: getId(), 
        time: 'Sat Apr 15 2021 21:22:08'
      },
      {
        userName: 'Orlando Dig', 
        userSrc: 'src/assets/icons/avatar5.jpg', 
        text: 'I like this', 
        id: getId(), 
        time: 'Sat Apr 16 2021 21:22:08'
      },
      {
        userName: 'Carmen Velasco', 
        userSrc: 'src/assets/icons/avatar1.svg', 
        text: 'Do you think you will have time?', 
        id: getId(), 
        time: 'Sat Apr 17 2021 20:22:08'
      },
      {
        userName: 'Chance Rhiel', 
        userSrc: 'src/assets/icons/avatar4.svg', 
        text: 'It is very nice!', 
        id: getId(), 
        time: 'Sat Apr 17 2021 21:22:08'
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

export { userList, actionList, todoList, }