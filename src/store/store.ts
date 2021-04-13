import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import { ACTION_TEXT, ITEMS_ACTION, THIRST_MIN, THIRST_MAX, TIRE_MIN, TIRE_MAX,
  HUNGER_MIN, HUNGER_MAX, HUNGER, HEALTH, THIRST, MIN_NUMBER, NUMBER_FOR_LENGTH, HIGH_VALUE,
  NUMBER_FOR_PROBABILITY, NUMBER_FOR_RANDOM, MAX_VALUE, INDEX_LAST_OPTION, HEALTH_MAX, HEALTH_MIN,
  INDICATORS_TITLES, INIT_OPTIONS, INIT_OPTION_VALUES } from './constants';

interface Option {
  [key: string]: number;
  health: number,
  thirst: number,
  tire: number,
  hunger: number,
}

interface Options {
  name: string,
  title: string,
  btnName: string
}

interface State { 
  options: Array<Options>,
  actionsText: Array<string>,
  optionValues: Option,
  funcs: Array<Function>,
  isShowModal: boolean,
  allActions: Array<string>
}

interface Payload {
  text: string,
  index: number
}

export const key: InjectionKey<Store<State>> = Symbol()

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max + NUMBER_FOR_RANDOM - min)) + min;
}

function getIncident(values: Option): Option {
  let randomNumber = getRandomNumber(MIN_NUMBER, NUMBER_FOR_PROBABILITY);
  let probability = Math.floor(randomNumber / NUMBER_FOR_PROBABILITY);
  if (probability) {
      let optionsNames = ['health', 'thirst', 'hunger', 'tire'];
      let randomOption = getRandomNumber(MIN_NUMBER, INDEX_LAST_OPTION);
      let action = optionsNames[randomOption];
      let textAction = INDICATORS_TITLES[randomOption];
      values[action] = MAX_VALUE;
      store.commit('getNewAction', { text : `у вас увеличился параметр ${textAction} до 100` });
  }
  return values;
}

function checkMaxOption(health: number, maxOption: number): number {
  if (health && maxOption > HIGH_VALUE) {
      let newHealth = getRandomNumber(health - HEALTH_MIN, health - HEALTH_MAX);
      health = newHealth;
  }
  return health;
}

function checkOptions(values: Option): Option {
  let maxOption = MIN_NUMBER;
  values = getIncident(values);
  for (let option in values) {
      let value = values[option];
      value = Math.min(value, MAX_VALUE);
      values[option] = Math.max(value, MIN_NUMBER);
      if (option !== 'health') {
          maxOption = Math.max(maxOption, value);
      }
  }
  values.health = checkMaxOption(values.health, maxOption);
  return values;
}

function checkHealth(health: number): boolean {
  let isGameOver = false;
  if (health <= MIN_NUMBER) {
      store.commit('getNewAction', { text : 'Вы проиграли' });
      store.commit('getNewAction', { text : ' ' });
      isGameOver = true;
  }
  return isGameOver;
}

function changeOptions(values: Option): Option {
  let oldOptions = values;
  values = checkOptions(values);
  values = ({...oldOptions, ...values});
  return values;
}

function drink(values: Option): Option {
  let { health, thirst, tire, hunger } = values;
  let newHealth = getRandomNumber(health - HEALTH, health + HEALTH);
  return changeOptions({thirst: thirst - THIRST, health: newHealth, tire, hunger});
}

function eat(values: Option): Option {
  let { health, thirst, tire, hunger } = values;
  let newHealth = getRandomNumber(health + HEALTH_MIN, health + HEALTH_MAX);
  return changeOptions({hunger: hunger - HUNGER, health: newHealth, thirst, tire});
}

function work(values: Option): Option {
  let { health, thirst, tire, hunger } = values;
  let newHealth = getRandomNumber(health - HEALTH_MIN, health - HEALTH_MAX);
  let newTire = getRandomNumber(tire + TIRE_MIN, tire + TIRE_MAX);
  let newThirst = getRandomNumber(thirst + THIRST_MIN, thirst + THIRST_MAX);
  let newHunger = getRandomNumber(hunger + HUNGER_MIN, hunger + HUNGER_MAX);
  let optionValues = { tire: newTire, health: newHealth, thirst: newThirst, hunger: newHunger }
  return changeOptions(optionValues);
}

function rest(values: Option): Option {
  let { health, thirst, tire, hunger } = values;
  let newHealth = getRandomNumber(health + HEALTH_MIN, health + HEALTH_MAX);
  let newTire = getRandomNumber(tire - TIRE_MIN, tire - TIRE_MAX);
  let newThirst = getRandomNumber(thirst + THIRST_MIN, thirst + THIRST_MAX);
  let newHunger = getRandomNumber(hunger + HUNGER_MIN, hunger + HUNGER_MAX);
  let optionValues = { tire: newTire, health: newHealth, thirst: newThirst, hunger: newHunger };
  return changeOptions(optionValues);
}

export const store = createStore<State>({
  state: {
    options: INIT_OPTIONS,
    optionValues: INIT_OPTION_VALUES,
    actionsText: [],
    funcs: [eat, drink, work, rest],
    isShowModal: false,
    allActions: [],
  },
  mutations: {
    getNewAction(state, payload: Payload) {
      let text = ACTION_TEXT[payload.index] || payload.text;
      let items = ITEMS_ACTION[payload.index];
      if (items) {
          let randomItem = getRandomNumber(MIN_NUMBER, items.length - NUMBER_FOR_LENGTH);
          text += items[randomItem];
      }
      state.actionsText.push(text);
      state.allActions.push(text)
    },
    changeValue(state, index: number) {
      state.optionValues = state.funcs[index](state.optionValues);
    },
    checkGameOver(state) {
      let isGameOver = checkHealth(state.optionValues.health);
      if (isGameOver) {
        state.optionValues = INIT_OPTION_VALUES;
        state.isShowModal = true;
        state.actionsText.length = 0;
      }
    },
    closeModal(state) {
      state.isShowModal = false;
    }
  },
  actions: {
    action ({ commit }, index) {
      commit('changeValue', index);
      commit('getNewAction', { index });
      commit('checkGameOver');
    },
  }
})

export function useStore () {
  return baseUseStore(key)
}