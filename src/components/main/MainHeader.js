import { observer } from 'mobx-react';

import Form from './Form';
import store from '../../mobx-multi/store';

const MainHeader = observer(() => {
    let name = `#${store.channelData.getName()}`;
    let numberSubscribers = store.channelData.getNumberSubscribers();

    return (
        <div className="main-header">
            <div className="main-header__topic">
                <div className="main-header__title">{name}</div>
                <button className="bookmark"></button>
            </div>
            <div className="main-header__content">
                <div className="number-subscribers">{numberSubscribers}</div>
                <Form />
                <button className="notifications"></button>
                <button className="else-btn"></button>
            </div>
        </div>
    );
})

export default MainHeader;