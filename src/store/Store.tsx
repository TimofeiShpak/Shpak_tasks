import React from 'react';
import classNames from "classnames";
import { makeAutoObservable } from "mobx";

import IndicatorElement from "src/components/Indicator";

import { ACTION_TEXT, ITEMS_ACTION, BUTTON_TEXT, CLASSES, THIRST_MIN, THIRST_MAX, TIREDNESS_MIN, TIREDNESS_MAX,
    HUNGER_MIN, HUNGER_MAX, HUNGER, HEALTH, THIRST, MIN_NUMBER, NUMBER_FOR_ID, NUMBER_FOR_LENGTH, 
    NUMBER_FOR_PROBABILITY, NUMBER_FOR_RANDOM, MAX_VALUE, INDEX_LAST_OPTION, HEALTH_MAX, HEALTH_MIN, HIGH_VALUE, 
    INDICATORS_TITLES, INDICATOR_NAMES, INIT_OPTIONS } from 'src/store/constants';

interface Option {
    health?: number,
    drink?: number,
    thirst?: number,
    tiredness?: number,
    hunger?: number,
}

class Store {
    options = INIT_OPTIONS;
    isShowModal = false;
    list = [];
    allActivities = [];

    functions = [this.eat, this.drink, this.work, this.rest];

    constructor() {
        makeAutoObservable(this);
    }

    setShowModal(value: boolean) {
        this.isShowModal = value;
    }

    resetOptions() {
        this.options = INIT_OPTIONS;
    }

    playerDied() {
        this.resetOptions();
        this.setShowModal(true);
        this.list = [];
    }

    getClassNameModal(): string {
        return classNames({
            "modal-wrapper": true,
            "hide":  this.isShowModal === false 
        });
    }

    getIndicatorsElements(): Array<JSX.Element> {
        return INDICATOR_NAMES.map((name, index) => {
            return <IndicatorElement 
                        name={name} 
                        title ={INDICATORS_TITLES[index]} 
                        key={name}
                        option={this.options[name]}
                    />
        });
    }

    getNewAction(text: string, items?: Array<string>) {
        if (items) {
            let randomItem = this.getRandomNumber(MIN_NUMBER, items.length - NUMBER_FOR_LENGTH);
            text += items[randomItem];
        }
        let id = this.getRandomNumber(MIN_NUMBER, NUMBER_FOR_ID);
        let newAction = <div className="action" key={id}>{text}</div>;
        this.list.push(newAction);
        this.allActivities.push(newAction);
    }

    getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max + NUMBER_FOR_RANDOM - min)) + min;
    }

    getIncident(values: Option): Option {
        let probability = Math.floor(this.getRandomNumber(MIN_NUMBER, NUMBER_FOR_PROBABILITY) / NUMBER_FOR_PROBABILITY);
        if (probability) {
            let optionsNames = ['health', 'thirst', 'hunger', 'tiredness'];
            let randomOption = this.getRandomNumber(MIN_NUMBER, INDEX_LAST_OPTION);
            let action = optionsNames[randomOption];
            let textAction = INDICATORS_TITLES[randomOption];
            values[action] = MAX_VALUE;
            this.getNewAction(`у вас увеличился параметр ${textAction} до 100`)
        }
        return values;
    }

    checkMaxOption(oldHealth: number, maxOption: number): number {
        let { health } = this.options;
        if (this.options.health && maxOption > HIGH_VALUE) {
            let newHealth = this.getRandomNumber(health - HEALTH_MIN, health - HEALTH_MAX);
            oldHealth = newHealth;
        }
        return oldHealth || health;
    }

    checkOptions(values: Option): Option {
        let maxOption = MIN_NUMBER;
        values = this.getIncident(values);
        for (let option in values) {
            let value = values[option];
            value = Math.min(value, MAX_VALUE);
            values[option] = Math.max(value, MIN_NUMBER);
            if (option !== 'health') {
                maxOption = Math.max(maxOption, value);
            }
        }
        values.health = this.checkMaxOption(values.health, maxOption);
        return values;
    }

    checkHealth(values: Option) {
        if (values?.health <= MIN_NUMBER) {
            this.getNewAction('Вы проиграли');
            this.getNewAction(' ');
            this.playerDied();
        }
    }

    changeOptions(values: Option) {
        values = this.checkOptions(values);
        this.options = ({...this.options, ...values});
        this.checkHealth(values);
    }

    drink() {
        let { health, thirst } = this.options;
        let newHealth = this.getRandomNumber(health - HEALTH, health + HEALTH);
        this.getNewAction(ACTION_TEXT[0], ITEMS_ACTION[0]);
        this.changeOptions({thirst: thirst - THIRST, health: newHealth});
    }

    eat() {
        let { health, hunger } = this.options;
        let newHealth = this.getRandomNumber(health + HEALTH_MIN, health + HEALTH_MAX);
        this.getNewAction(ACTION_TEXT[1], ITEMS_ACTION[1]);
        this.changeOptions({hunger: hunger - HUNGER, health: newHealth});
    }

    work() {
        let { health, hunger, tiredness, thirst } = this.options;
        let newHealth = this.getRandomNumber(health - HEALTH_MIN, health - HEALTH_MAX);
        let newTiredness = this.getRandomNumber(tiredness + TIREDNESS_MIN, tiredness + TIREDNESS_MAX);
        let newThirst = this.getRandomNumber(thirst + THIRST_MIN, thirst + THIRST_MAX);
        let newHunger = this.getRandomNumber(hunger + HUNGER_MIN, hunger + HUNGER_MAX);
        this.getNewAction(ACTION_TEXT[2], ITEMS_ACTION[2]);
        this.changeOptions({ tiredness: newTiredness, health: newHealth, thirst: newThirst, hunger: newHunger });
    }

    rest() {
        let { health, hunger, tiredness, thirst } = this.options;
        let newHealth = this.getRandomNumber(health + HEALTH_MIN, health + HEALTH_MAX);
        let newTiredness = this.getRandomNumber(tiredness - TIREDNESS_MIN, tiredness - TIREDNESS_MAX);
        let newThirst = this.getRandomNumber(thirst + THIRST_MIN, thirst + THIRST_MAX);
        let newHunger = this.getRandomNumber(hunger + HUNGER_MIN, hunger + HUNGER_MAX);
        this.getNewAction(ACTION_TEXT[3], ITEMS_ACTION[3]);
        this.changeOptions({ tiredness: newTiredness, health: newHealth, thirst: newThirst, hunger: newHunger });
    }

    getButtons(): Array<JSX.Element> {
        return this.functions.map((func, index) => {
            let action = func.bind(this);
            return (
                <button 
                    className={`btn btn_${CLASSES[index]}`} 
                    onClick={action}
                    key={index}>
                    {BUTTON_TEXT[index]}
                </button> 
            )
        });
    }
}

let store = new Store();
export default store;