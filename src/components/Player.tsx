import React from 'react';
import { observer } from 'mobx-react';

import store from '../store/Store';
import IndicatorList from './IndicatorList';
import ButtonList from './ButtonList';

const Player = observer(() => {
    return (
        <div className="wrapper">
            <div className="player">
                <IndicatorList />
                <ButtonList />
            </div>
            <div className="activities">
                {store.list}
            </div>
        </div>
    )
});

export default Player;