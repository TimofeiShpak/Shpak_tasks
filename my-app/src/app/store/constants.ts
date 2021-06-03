const ITEMS_REST = ['на диване', 'в кресле', 'при просмотре телевизора', 'читая книгу'];
const ITEMS_EAT = ['яблоко', 'грушу', 'банан', 'сыр', 'колбасу', 'арбуз', 'макароны', 'сосиски', 'хлеб'];
const ITEMS_DRINK = ['молоко', 'сок', 'воду', 'минералку', 'газировку', 'энергетик', 'кефир', 'чай', 'кофе'];
const ITEMS_WORK = ['в детском саду', 'в школе', 'в университете', 'в театре', 'в кинотеатре', 
    'в колледже', 'в другом городе', 'в другой стране', 'в музее'];

interface storage {
    [key: string]: any
}

const ACTION_TEXT: storage = { 'eat': 'Вы съели ', 'drink': 'Вы выпили ', 'work': 'Вы вылечились ',
    'rest': 'Вы отдохнули ' };
const ITEMS_ACTION: storage = { 'eat': ITEMS_EAT, 'drink': ITEMS_DRINK, 
    'work': ITEMS_WORK, 'rest': ITEMS_REST };

const THIRST_MIN = 30;
const THIRST_MAX = 40;
const TIRE_MIN = 10;
const TIRE_MAX = 20;
const HUNGER_MIN = 10;
const HUNGER_MAX = 20;


const HUNGER = 5;

const HEALTH = 1;
const THIRST = 5;

const MIN_NUMBER = 0;
const NUMBER_FOR_LENGTH = 1;
const NUMBER_FOR_RANDOM = 1;
const NUMBER_FOR_PROBABILITY = 10;
const MAX_VALUE = 100;
const INDEX_LAST_OPTION = 3;
const HEALTH_MIN = 1;
const HEALTH_MAX = 10;
const HIGH_VALUE = 80;
const INIT_VALUE = 50;

const INDICATORS_TITLES = ['Здоровье','Жажда','Голод','Усталость'];

const INIT_OPTION_VALUES = {
    health: INIT_VALUE,
    thirst: INIT_VALUE,
    hunger: INIT_VALUE,
    tire: INIT_VALUE,
}

const INIT_OPTIONS = [
    { name : 'health', title : 'Здоровье', btnName: 'eat' },
    { name : 'hunger', title : 'Голод', btnName: 'drink' },
    { name : 'thirst', title : 'Жажда', btnName: 'work' },
    { name : 'tire', title : 'Усталость', btnName: 'rest' }
]

export { ACTION_TEXT, ITEMS_ACTION, THIRST_MIN, THIRST_MAX, TIRE_MIN, TIRE_MAX,
    HUNGER_MIN, HUNGER_MAX, HUNGER, HEALTH, THIRST, MIN_NUMBER, NUMBER_FOR_LENGTH, HIGH_VALUE, 
    NUMBER_FOR_PROBABILITY, NUMBER_FOR_RANDOM, MAX_VALUE, INDEX_LAST_OPTION, HEALTH_MAX, HEALTH_MIN, 
    INDICATORS_TITLES, INIT_OPTION_VALUES, INIT_OPTIONS }; 