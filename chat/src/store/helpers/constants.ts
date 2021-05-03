const INIT_USER = {
  "id": "0",
  "isOnline": false,
  "src": "src/assets/images/anonim.jpg",
  "fullName": "",
  "specialty": "",
  "twitter": "",
  "instagram": "",
  "facebook": "",
  "linkedin": "",
  "userName": "",
  "Email": "",
  "Skype": "",
  "friends": {},
  "friendRequests": {},
};

const SMILES = ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃",
    "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "☺", "😚", "😙", "😋",
    "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐",
    "😑", "😶", "😏", "😒", "🙄", "😬", "🤥", "😌", "😔", "😪", "🤤", "😴",
    "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "🤯", "🤠",
    "🥳", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹", "😮", "😯", "😲", "😳",
    "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞",
    "😓", "😩", "😫", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠", "💩",
    "🤡", "👹", "👺", "👻", "👽", "👾", "🚌"];

const OPTIONS = ['userName', 'fullName', 'specialty','twitter', 'instagram', 
    'facebook', 'linkedin', 'Email', 'Skype'];
const REQUIRED_OPTIONS = ['userName', 'fullName'];
const NAME_EXTRA_INFO = ['userName', 'Email', 'Skype'];
const NAME_ICONS = ['facebook', 'instagram', 'linkedin', 'twitter'];
const USER_CLASSES = ['user-item__img', 'message__author'];
const INTERACTIVE_CLASSES = ['message__addressee', 'message__btn']

const LOG_OUT = 'Log out';
const EDIT_PROFILE = 'Edit profile';
const DELETE_PROFILE = 'Delete profile';
const NAME_SETTINGS = [LOG_OUT, EDIT_PROFILE, DELETE_PROFILE];

const MESSAGE = 'Message';
const ADD_FRIEND = 'Add friend';
const REMOVE_FRIEND = 'Remove friend';
const ACCEPT_REQUEST = 'Accept request';
const CANCEL_REQUEST = 'Cancel request';
const CANCEL_INVITATION = 'Cancel invitation';

const PATH_EDIT_PROFILE = '/edit-profile';
const PATH_AUTHORIZATION = '/authorization';
const PATH_LOADING = '/loading';
const PATH_HOME = '/';
const HEIGHT_INPUT = '38px';
const MIN_TOP = 200;

export { NAME_SETTINGS, INIT_USER, LOG_OUT, 
  EDIT_PROFILE, DELETE_PROFILE, SMILES, HEIGHT_INPUT, NAME_ICONS, NAME_EXTRA_INFO,
  MIN_TOP, OPTIONS, PATH_EDIT_PROFILE, PATH_AUTHORIZATION, PATH_HOME, REQUIRED_OPTIONS,
  USER_CLASSES, INTERACTIVE_CLASSES, MESSAGE, ADD_FRIEND, REMOVE_FRIEND, 
  ACCEPT_REQUEST, CANCEL_REQUEST, CANCEL_INVITATION, PATH_LOADING }