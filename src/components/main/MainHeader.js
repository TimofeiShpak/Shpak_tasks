import { observer } from 'mobx-react';

import Form from './Form';
import store from '../../store/store';

const MainHeader = observer(() => {
    return (
        <div className="main-header">
            <div className="main-header__topic">
                <div className="main-header__title">{`#${store.channelData.name}`}</div>
                <button className="bookmark"></button>
            </div>
            <div className="main-header__content">
                <div className="number-subscribers">{}</div>
                <Form />
                <button className="notifications"></button>
                <button className="else-btn"></button>
            </div>
        </div>
    );
})

export default MainHeader;