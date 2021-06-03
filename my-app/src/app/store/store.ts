import { makeAutoObservable } from "mobx";
import { ACTION_TEXT, INIT_OPTION_VALUES, ITEMS_ACTION, MIN_NUMBER, NUMBER_FOR_LENGTH } from "./constants";
import { getRandomNumber, checkHealth, funcs } from './helpers';

export interface Options {
  [key: string]: number,
  'health': number,
  'thirst': number,
  'hunger': number,
  'tire': number,
}

export class Store {
  options: Options = {
    'health': 50,
    'thirst': 50,
    'hunger': 50,
    'tire': 50,
  };
  buttons = {'eat': 'hunger', 'drink': 'thirst', 'rest': 'tire', 'work': 'health'};
  actionsText: Array<string> = [];
  allActions: Array<string>  = [];
  isShowModal = false;

  constructor() {
    makeAutoObservable(this);
  }

  getNewAction(value: string, action: string = '') {
    let text = ACTION_TEXT[action] || value;
    let items = ITEMS_ACTION[action];
    if (items) {
        let randomItem = getRandomNumber(MIN_NUMBER, items.length - NUMBER_FOR_LENGTH);
        text += items[randomItem];
    }
    this.actionsText.push(text);
    this.allActions.push(text)
  }

  changeValue(option: string) {
    this.options = funcs[option](this.options);
    this.getNewAction('', option);
    this.checkGameOver();
  }
  
  checkGameOver() {
    let isGameOver = checkHealth(this.options.health);
    if (isGameOver) {
      this.options = INIT_OPTION_VALUES;
      this.isShowModal = true;
      this.actionsText.length = 0;
    }
  }

  closeModal() {
    this.isShowModal = false;
  }
}

let store = new Store();
export default store;