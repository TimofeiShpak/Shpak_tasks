import ButtonEat from './ButtonEat';
import ButtonDrink from './ButtonDrink';
import ButtonWork from './ButtonWork';
import ButtonMakeSport from './ButtonMakeSport';

const MIN_NUMBER = 0;
const NUMBER_FOR_ID = 100000;
const NUMBER_FOR_LENGTH = 1;
const NUMBER_FOR_RANDOM = 1;
const NUMBER_FOR_PROBABILITY = 10;
const MAX_VALUE = 100;
const INDEX_LAST_OPTION = 3;
const DIFFERENCE_HEALTH_MIN = 1;
const DIFFERENCE_HEALTH_MAX = 10;
const HIGH_VALUE = 80;

function ButtonList(props) {
    let { health } = props.options;
    let propsButton = {
        options : props.options,
        changeOptions : changeOptions, 
        getRandomNumber : getRandomNumber,                     
        getNewAction : getNewAction,
    }

    function getNewAction(text, items) {
        if (items) {
            let randomItem = getRandomNumber(MIN_NUMBER, items.length - NUMBER_FOR_LENGTH);
            text += items[randomItem];
        }
        let id = getRandomNumber(MIN_NUMBER, NUMBER_FOR_ID);
        let newAction = <div className="action" key={id}>{text}</div>;
        props.list.push(newAction);
        props.setList(props.list);
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max + NUMBER_FOR_RANDOM - min)) + min;
    }

    function getIncident(values) {
        let probability = Math.floor(getRandomNumber(MIN_NUMBER, NUMBER_FOR_PROBABILITY) / NUMBER_FOR_PROBABILITY);
        if (probability) {
            let optionsNames = ['health', 'thirst', 'hunger', 'tiredness'];
            let randomOption = getRandomNumber(MIN_NUMBER, INDEX_LAST_OPTION);
            let action = optionsNames[randomOption];
            values[action] = MAX_VALUE;
            getNewAction(`у вас увеличился параметр ${action} до 100`)
        }
        return values;
    }

    function checkMaxOption(oldHealth, maxOption) {
        if (health && maxOption > HIGH_VALUE) {
            let newHealth = getRandomNumber(health - DIFFERENCE_HEALTH_MIN, health - DIFFERENCE_HEALTH_MAX);
            oldHealth = newHealth;
        }
        return oldHealth || health;
    }

    function checkOptions(values) {
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

    function checkHealth(values) {
        if (values?.health <= MIN_NUMBER) {
            getNewAction('Вы проиграли');
            getNewAction(' ');
            props.playerDied();
        }
    }

    function changeOptions(values) {
        values = checkOptions(values);
        props.setOptions({...props.options, ...values});
        checkHealth(values);
    }

    return (
        <div className="button-group">
            <ButtonEat propsButton={propsButton} />
            <ButtonDrink propsButton={propsButton} />  
            <ButtonWork propsButton={propsButton} />            
            <ButtonMakeSport propsButton={propsButton} />
        </div>
    )
}

export default ButtonList;