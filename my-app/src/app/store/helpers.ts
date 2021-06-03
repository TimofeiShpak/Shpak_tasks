import { THIRST_MIN, THIRST_MAX, TIRE_MIN, TIRE_MAX,
  HUNGER_MIN, HUNGER_MAX, HUNGER, HEALTH, THIRST, MIN_NUMBER, HIGH_VALUE,
  NUMBER_FOR_PROBABILITY, NUMBER_FOR_RANDOM, MAX_VALUE, INDEX_LAST_OPTION, HEALTH_MAX, HEALTH_MIN,
  INDICATORS_TITLES } from './constants';
import store, { Options } from './store';

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max + NUMBER_FOR_RANDOM - min)) + min;
}

function getIncident(values: Options): Options {
let randomNumber = getRandomNumber(MIN_NUMBER, NUMBER_FOR_PROBABILITY);
let probability = Math.floor(randomNumber / NUMBER_FOR_PROBABILITY);
if (probability) {
    let optionsNames = ['health', 'thirst', 'hunger', 'tire'];
    let randomOption = getRandomNumber(MIN_NUMBER, INDEX_LAST_OPTION);
    let action = optionsNames[randomOption];
    let textAction = INDICATORS_TITLES[randomOption];
    values[action] = MAX_VALUE;
    store.getNewAction(`у вас увеличился параметр ${textAction} до 100`, action);
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

function checkOptions(values: Options): Options {
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

export function checkHealth(health: number): boolean {
let isGameOver = false;
if (health <= MIN_NUMBER) {
    store.getNewAction('Вы проиграли');
    isGameOver = true;
}
return isGameOver;
}

function changeOptions(values: Options): Options {
let oldOptions = values;
values = checkOptions(values);
values = ({...oldOptions, ...values});
return values;
}

function drink(values: Options): Options {
let { health, thirst, tire, hunger } = values;
let newHealth = getRandomNumber(health - HEALTH, health + HEALTH);
return changeOptions({thirst: thirst - THIRST, health: newHealth, tire, hunger});
}

function eat(values: Options): Options {
let { health, thirst, tire, hunger } = values;
let newHealth = getRandomNumber(health + HEALTH_MIN, health + HEALTH_MAX);
return changeOptions({hunger: hunger - HUNGER, health: newHealth, thirst, tire});
}

function work(values: Options): Options {
let { health, thirst, tire, hunger } = values;
let newHealth = getRandomNumber(health - HEALTH_MIN, health - HEALTH_MAX);
let newTire = getRandomNumber(tire + TIRE_MIN, tire + TIRE_MAX);
let newThirst = getRandomNumber(thirst + THIRST_MIN, thirst + THIRST_MAX);
let newHunger = getRandomNumber(hunger + HUNGER_MIN, hunger + HUNGER_MAX);
let optionValues = { tire: newTire, health: newHealth, thirst: newThirst, hunger: newHunger }
return changeOptions(optionValues);
}

function rest(values: Options): Options {
let { health, thirst, tire, hunger } = values;
let newHealth = getRandomNumber(health + HEALTH_MIN, health + HEALTH_MAX);
let newTire = getRandomNumber(tire - TIRE_MIN, tire - TIRE_MAX);
let newThirst = getRandomNumber(thirst + THIRST_MIN, thirst + THIRST_MAX);
let newHunger = getRandomNumber(hunger + HUNGER_MIN, hunger + HUNGER_MAX);
let optionValues = { tire: newTire, health: newHealth, thirst: newThirst, hunger: newHunger };
return changeOptions(optionValues);
}

interface functions {
  [key: string]: any,
}
export let funcs:functions = { 'eat': eat, 'drink': drink, 'work': work, 'rest': rest };
