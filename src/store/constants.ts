const ITEMS_REST = ['на диване', 'в кресле', 'при просмотре телевизора', 'читая книгу'];
const ITEMS_EAT = ['яблоко', 'грушу', 'банан', 'сыр', 'колбасу', 'арбуз', 'макароны', 'сосиски', 'хлеб'];
const ITEMS_DRINK = ['молоко', 'сок', 'воду', 'минералку', 'газировку', 'энергетик', 'кефир', 'чай', 'кофе'];
const ITEMS_WORK = ['в детском саду', 'в школе', 'в университете', 'в театре', 'в кинотеатре', 
    'в колледже', 'в другом городе', 'в другой стране', 'в музее'];

const ACTION_TEXT = ['Вы съели ', 'Вы выпили ', 'Вы поработали ', 'Вы отдохнули '];
const ITEMS_ACTION = [ITEMS_EAT, ITEMS_DRINK, ITEMS_WORK, ITEMS_REST];
const BUTTON_TEXT = ['Есть', 'Пить', 'Работать', 'Отдыхать'];
const CLASSES = ['eat', 'drink', 'work', 'rest'];

const THIRST_MIN = 30;
const THIRST_MAX = 40;
const TIREDNESS_MIN = 10;
const TIREDNESS_MAX = 20;
const HUNGER_MIN = 10;
const HUNGER_MAX = 20;


const HUNGER = 5;

const HEALTH = 1;
const THIRST = 5;

const MIN_NUMBER = 0;
const NUMBER_FOR_ID = 100000;
const NUMBER_FOR_LENGTH = 1;
const NUMBER_FOR_RANDOM = 1;
const NUMBER_FOR_PROBABILITY = 10;
const MAX_VALUE = 100;
const INDEX_LAST_OPTION = 3;
const HEALTH_MIN = 1;
const HEALTH_MAX = 10;
const HIGH_VALUE = 80;
const INIT_VALUE = 50;

const INDICATOR_NAMES = ['health', 'thirst', 'hunger', 'tiredness'];
const INDICATORS_TITLES = ['Здоровье','Жажда','Голод','Усталость'];

const INIT_OPTIONS = {
    health: INIT_VALUE,
    thirst: INIT_VALUE,
    hunger: INIT_VALUE,
    tiredness: INIT_VALUE,
}

export { ACTION_TEXT, ITEMS_ACTION, BUTTON_TEXT, CLASSES, THIRST_MIN, THIRST_MAX, TIREDNESS_MIN, TIREDNESS_MAX,
    HUNGER_MIN, HUNGER_MAX, HUNGER, HEALTH, THIRST, MIN_NUMBER, NUMBER_FOR_ID, NUMBER_FOR_LENGTH, 
    NUMBER_FOR_PROBABILITY, NUMBER_FOR_RANDOM, MAX_VALUE, INDEX_LAST_OPTION, HEALTH_MAX, HEALTH_MIN, HIGH_VALUE, 
    INDICATORS_TITLES, INDICATOR_NAMES, INIT_OPTIONS }; 