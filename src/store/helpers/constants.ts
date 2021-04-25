const userList = [
  {
    "userName": "Carmen Velasco",
    "userSrc": "./avatar1.svg",
    "id": "45258924-94f7-4c8d-aca2-6fbe59f0feb5"
  },
  {
    "userName": "Alena Curtis",
    "userSrc": "./avatar2.svg",
    "id": "rt258924-94f7-4c8d-aca2-6fbe59f0feb5"
  },
  {
    "userName": "Amelia Luna",
    "userSrc": "./avatar3.svg",
    "id": "hj258924-94f7-4c8d-aca2-6fbe59f0feb5"
  },
  {
    "userName": "Chance Rhiel",
    "userSrc": "./avatar4.svg",
    "id": "34258924-94f7-4c8d-aca2-6fbe59f0feb5"
  },
  {
    "userName": "Orlando Dig",
    "userSrc": "./avatar5.jpg",
    "id": "de258924-94f7-4c8d-aca2-6fbe59f0feb5"
  }
];

const todoList =  [
  {
    "text": "Evaluate the addition and deletion of user IDs.",
    "progress": "Pending",
    "status": "Minor",
    "id": "45258924-9re7-4c8d-aca2-6fbe59f0feb5",
    "author": "Amelia Luna",
    "creator": "Chance Rhiel",
    "comments": [
      {
        "userName": "Alena Curtis",
        "userSrc": "./avatar2.svg",
        "text": "Amazing! Great work. 🥰 Keep it up, bro",
        "id": "45258924-94f7-4c8d-aet2-6fbe59f0feb5",
        "time": "Sat Apr 16 2021 18:22:08",
        "taskName": "Evaluate the addition and deletion of user IDs."
      },
      {
        "userName": "Orlando Dig",
        "userSrc": "./avatar5.jpg",
        "text": "I like this",
        "id": "45258924-94f7-4c8d-yca2-6fbe59f0feb5",
        "time": "Sat Apr 16 2021 21:22:08",
        "taskName": "Evaluate the addition and deletion of user IDs."
      },
      {
        "userName": "Carmen Velasco",
        "userSrc": "./avatar1.svg",
        "text": "Do you think you will have time?",
        "id": "45258y24-94f7-4c8d-aca2-6fbe59f0feb5",
        "time": "Sat Apr 17 2021 20:22:08",
        "taskName": "Evaluate the addition and deletion of user IDs."
      },
      {
        "userName": "Chance Rhiel",
        "userSrc": "./avatar4.svg",
        "text": "It is very nice!",
        "id": "452rw924-94f7-4c8d-aca2-6fbe59f0feb5",
        "time": "Sat Apr 17 2021 21:22:08",
        "taskName": "Evaluate the addition and deletion of user IDs."
      }
    ]
  },
  {
    "text": "Identify the implementation team.",
    "progress": "In Progress",
    "status": "Normal",
    "id": "45258924-9cv7-4c8d-aca2-6fbe59f0feb5",
    "author": "Carmen Velasco",
    "creator": "Alena Curtis",
    "comments": []
  },
  {
    "text": "Batch schedule download/process.",
    "progress": "Pending",
    "status": "Critical",
    "id": "452bn924-94f7-4c8d-aca2-6fbe59f0feb5",
    "author": "Chance Rhiel",
    "creator": "Amelia Luna",
    "comments": []
  },
  {
    "text": "Monitor system performance and adjust hardware.",
    "progress": "Pending",
    "status": "Minor",
    "id": "45258924-94f7-4c8d-aca2-6fgh59f0feb5",
    "author": "Alena Curtis",
    "creator": "Alena Curtis",
    "comments": []
  },
  {
    "text": "Install console machines and prerequisite software.",
    "progress": "Completed",
    "status": "Critical",
    "id": "jhe58924-94f7-4c8d-aca2-6fbe59f0feb5",
    "author": "Carmen Velasco",
    "creator": "Alena Curtis",
    "comments": []
  },
  {
    "text": "Design a relatively simple business system",
    "progress": "Pending",
    "status": "Critical",
    "id": "452xc924-94f7-4c8d-aca2-6fbe59f0feb5",
    "author": "Alena Curtis",
    "creator": "Alena Curtis",
    "comments": []
  },
  {
    "text": "Define users and workflow",
    "progress": "Cancelled",
    "status": "Minor",
    "id": "452sd924-94f7-4c8d-aca2-6fbe59f0feb5",
    "author": "Amelia Luna",
    "creator": "Alena Curtis",
    "comments": []
  }
]

const actionList = [
  {
    "userSrc": "./avatar3.svg",
    "userName": "Amelia Luna",
    "time": "Sat Apr 16 2021 15:22:08",
    "text": "Create new task",
    "id": "45r58924-94f7-4c8d-fya2-6fbe59f0feb5",
    "subtext": "Evaluate the addition and deletion of user IDs."
  },
  {
    "userSrc": "./avatar2.svg",
    "userName": "Alena Curtis",
    "time": "Sat Apr 16 2021 18:22:08",
    "text": "Comment task",
    "id": "45258924-94f7-4c8d-fya2-6fbe59f0feb5",
    "subtext": "Evaluate the addition and deletion of user IDs.",
    "comment": "Amazing! Great work. 🥰 Keep it up, bro"
  },
  {
    "userSrc": "./avatar5.jpg",
    "userName": "Orlando Dig",
    "time": "Sat Apr 16 2021 21:22:08",
    "text": "Comment task",
    "id": "452q8924-94f7-4c8d-fya2-6fbe59f0feb5",
    "subtext": "Evaluate the addition and deletion of user IDs.",
    "comment": "I like this"
  },
  {
    "userSrc": "./avatar1.svg",
    "userName": "Carmen Velasco",
    "time": "Sat Apr 17 2021 20:22:08",
    "text": "Create new task",
    "id": "45258924-94f7-qw8d-aca2-6fbe59f0feb5",
    "subtext": "Identify the implementation team.",
    "comment": "Do you think you will have time?"
  },
  {
    "text": "Comment task",
    "id": "452t8924-94f7-qw8d-aca2-6fbe59f0feb5",
    "subtext": "Identify the implementation team.",
    "userName": "Chance Rhiel",
    "userSrc": "./avatar4.svg",
    "comment": "It is very nice!",
    "time": "Sat Apr 17 2021 21:22:08"
  },
  {
    "userSrc": "./avatar4.svg",
    "userName": "Chance Rhiel",
    "time": "Sat Apr 18 2021 20:22:08",
    "text": "Create new task",
    "id": "45258924-94f7-4c8d-aca2-6fbeerf0feb5",
    "subtext": "Batch schedule download/process."
  },
  {
    "userSrc": "./avatar2.svg",
    "userName": "Alena Curtis",
    "time": "Sat Apr 18 2021 21:22:08",
    "text": "Create new task",
    "id": "452io924-94f7-4c8d-aca2-6fbeerf0feb5",
    "subtext": "Monitor system performance and adjust hardware."
  },
  {
    "userSrc": "./avatar1.svg",
    "userName": "Carmen Velasco",
    "time": "Sat Apr 18 2021 21:32:08",
    "text": "Create new task",
    "id": "pa2io924-94f7-4c8d-aca2-6fbeerf0feb5",
    "subtext": "Install console machines and prerequisite software."
  },
  {
    "userSrc": "./avatar2.svg",
    "userName": "Alena Curtis",
    "time": "Sat Apr 18 2021 21:37:08",
    "text": "Create new task",
    "id": "fg2io924-94f7-4c8d-aca2-6fbeerf0feb5",
    "subtext": "Design a relatively simple business system"
  },
  {
    "userSrc": "./avatar3.svg",
    "userName": "Amelia Luna",
    "time": "Sat Apr 18 2021 21:47:08",
    "text": "Create new task",
    "id": "hj2io924-94f7-4c8d-aca2-6fbeerf0feb5",
    "subtext": "Define users and workflow"
  }
]

const INIT_SEARCH = { searchText: '', resultSearch: [], index: 0, oldText: '', isSearch: false };
const MIN_TOP = 330;

const INIT_TODO = { text: '', progress: 'In Progress', status: 'Normal', creator: '' };
const INPUT_LIST_DATA = ['author', 'description', 'progress', 'status', 'creator'];
const PROGRESS_LIST = ['In Progress','Pending','Completed','Canceled'];
const STATUS_LIST = ['Normal','Minor','Critical'];

const INIT_USER_DATA = { userName: '', userSrc: '', id: '' };
const INIT_LISTS = { status: [], progress: [], creator: [] };

const MINUTE = 60*1000;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const YESTERDAY = DAY * 2;

export { INIT_LISTS, INIT_TODO, INPUT_LIST_DATA, PROGRESS_LIST, STATUS_LIST, MINUTE, HOUR, 
  DAY, YESTERDAY, INIT_USER_DATA, INIT_SEARCH, MIN_TOP, userList, todoList, actionList } 