import { observer } from 'mobx-react';

import Form from './Form';
import store from '../../mobx-multi/store';

const MainHeader = observer(() => {
    let name = `#${store.channelData.getName()}`; 

    return (
        <div className="main__header">
            <div className="main__topic">
                <div className="main__title">{name}</div>
            </div>
            <Form />
        </div>
    );
})

export default MainHeader;