const ACTION_TEXT = 'Вы позанимались ';
const DIFFERENCE_HEALTH_MIN = 1;
const DIFFERENCE_HEALTH_MAX = 10;
const DIFFERENCE_PERCENT_MIN = 1;
const DIFFERENCE_PERCENT_MAX = 20;
const INIT_VALUE = 1;
const MAX_PERCENT = 100;

const items = ['с гирями', 'со штангой', 'на беговой дорожке', 'на тренажере для ног', 'на тренажере для спины', 
    'на тренажере для рук', 'на турнике', 'на брусьях', 'на стадионе'];

function ButtonMakeSport(props) {
    props = props.propsButton;
    let { hunger, thirst, health, tiredness } = props.options;
    
    function makeSport() {
        let newHealth = props.getRandomNumber(health + DIFFERENCE_HEALTH_MIN, health + DIFFERENCE_HEALTH_MAX);
        let randomPercent = props.getRandomNumber(DIFFERENCE_PERCENT_MIN, DIFFERENCE_PERCENT_MAX) / MAX_PERCENT + INIT_VALUE;
        let newTiredness = tiredness * randomPercent;
        let newThirst = thirst * randomPercent;
        let newHunger = hunger * randomPercent;
        let option = {
            tiredness : newTiredness,
            health : newHealth,
            thirst : newThirst,
            hunger : newHunger
        }
        props.getNewAction(ACTION_TEXT, items);
        props.changeOptions(option);

    }

    return (
        <button className="btn btn_sport" onClick={makeSport}>Заниматься спортом</button>
    );
}

export default ButtonMakeSport;