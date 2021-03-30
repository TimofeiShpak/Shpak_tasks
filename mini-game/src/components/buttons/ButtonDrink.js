const ACTION_TEXT = 'Вы выпили ';
const DIFFERENCE_HEALTH = 1;
const DIFFERENCE_THIRST = 5;

const items = ['молоко', 'сок', 'воду', 'минералку', 'газировку', 'энергетик', 'кефир', 'чай', 'кофе'];

function ButtonDrink(props) {
    props = props.propsButton;
    let { thirst, health } = props.options;

    function drink() {
        let newHealth = props.getRandomNumber(health - DIFFERENCE_HEALTH, health + DIFFERENCE_HEALTH);
        props.getNewAction(ACTION_TEXT, items);
        props.changeOptions({thirst : thirst - DIFFERENCE_THIRST, health : newHealth});
    }

    return (
        <button className="btn btn_drink" onClick={drink}>Пить</button>
    );
}

export default ButtonDrink;