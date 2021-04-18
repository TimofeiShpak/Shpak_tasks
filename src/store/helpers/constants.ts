const INIT_TODO = ['', 'In Progress', 'Normal'];
const INPUT_LIST_DATA = ['author', 'description', 'progress', 'status', 'creator'];
const PROGRESS_LIST = ['In Progress','Pending','Completed','Canceled'];
const STATUS_LIST = ['Normal','Minor','Critical'];

const INIT_USER_DATA = { userName: '', userSrc: '', id: '' };
const INIT_SEARCH = { searchText: '', resultSearch: [], index: 0, oldText: '', isSearch: false };

const MINUTE = 60*1000;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const YESTERDAY = DAY * 2;
const MIN_TOP = 330;

export { INIT_TODO, INPUT_LIST_DATA, PROGRESS_LIST, STATUS_LIST, MINUTE, HOUR, 
  DAY, YESTERDAY, INIT_USER_DATA, INIT_SEARCH, MIN_TOP } 