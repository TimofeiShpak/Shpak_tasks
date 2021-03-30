const ACTION_TEXT = 'Вы поработали ';
const DIFFERENCE_HEALTH_MIN = 10;
const DIFFERENCE_HEALTH_MAX = 20;
const DIFFERENCE_THIRST_MIN = 30;
const DIFFERENCE_THIRST_MAX = 40;
const DIFFERENCE_TIREDNESS_MIN = 10;
const DIFFERENCE_TIREDNESS_MAX = 20;
const DIFFERENCE_HUNGER_MIN = 10;
const DIFFERENCE_HUNGER_MAX = 20;

const items = ['в детском саду', 'в школе', 'в университете', 'в театре', 'в кинотеатре', 
    'в колледже', 'в другом городе', 'в другой стране', 'в музее'];

function ButtonWork(props) {
    props = props.propsButton;
    let { hunger, thirst, health, tiredness } = props.options;

    function work() {
        let newHealth = props.getRandomNumber(health - DIFFERENCE_HEALTH_MIN, health - DIFFERENCE_HEALTH_MAX);
        let newTiredness = props.getRandomNumber(tiredness - DIFFERENCE_TIREDNESS_MIN, tiredness - DIFFERENCE_TIREDNESS_MAX);
        let newThirst = props.getRandomNumber(thirst + DIFFERENCE_THIRST_MIN, thirst + DIFFERENCE_THIRST_MAX);
        let newHunger = props.getRandomNumber(hunger + DIFFERENCE_HUNGER_MIN, hunger + DIFFERENCE_HUNGER_MAX);
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
        <button className="btn btn_work" onClick={work}>Работать</button>
    );
}

export default ButtonWork;