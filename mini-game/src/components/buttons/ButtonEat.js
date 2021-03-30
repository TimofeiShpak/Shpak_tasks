const ACTION_TEXT = 'Вы съели ';
const DIFFERENCE_HEALTH_MIN = 1;
const DIFFERENCE_HEALTH_MAX = 1;
const DIFFERENCE_HUNGER = 5;

const items = ['яблоко', 'грушу', 'банан', 'сыр', 'колбасу', 'арбуз', 'макароны', 'сосиски', 'хлеб'];


function ButtonEat(props) {
    props = props.propsButton;
    let { hunger, health } = props.options;

    function eat() {
        let newHealth = props.getRandomNumber(health + DIFFERENCE_HEALTH_MIN, health + DIFFERENCE_HEALTH_MAX);
        props.getNewAction(ACTION_TEXT, items);
        props.changeOptions({hunger : hunger - DIFFERENCE_HUNGER, health : newHealth});

    }

    return (
        <button className="btn btn_eat" onClick={eat}>Есть</button>
    );
}

export default ButtonEat;