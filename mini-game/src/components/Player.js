import { useState } from 'react';

import IndicatorList from './IndicatorList';
import ButtonList from './buttons/ButtonList';

const INIT_VALUE = 50;

let initOptions = {
    health: INIT_VALUE,
    thirst: INIT_VALUE,
    hunger: INIT_VALUE,
    tiredness: INIT_VALUE,
}

function Player(props) {
    let [options, setOptions] = useState(initOptions);
    let [list, setList] = useState([]);

    function playerDied() {
        let newList = props.allActivities.concat(list);
        setOptions(initOptions);
        props.setShowModal(true);
        props.setAllActivities(newList);
        setList([]);
    }

    return (
        <div className="wrapper">
            <div className="player">
                <IndicatorList options={options} />
                <ButtonList 
                    options={options}
                    setOptions={setOptions} 
                    list={list}
                    setList={setList}
                    playerDied={playerDied}
                />
            </div>
            <div className="activities">
                {list}
            </div>
        </div>
    )
}

export default Player;