import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';

const MainHeader = observer(() => {
    let name = `#${store.channelData.getName()}`;

    return (
        <div className="main-header">
            <div className="main-header__topic">
                <div className="main-header__title">{name}</div>
            </div>
        </div>
    );
})

export default MainHeader;