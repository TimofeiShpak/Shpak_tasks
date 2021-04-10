import { observer } from 'mobx-react';
import React from 'react';

import store from 'src/store/Store';

const ButtonList = observer(() => {
    return (
        <div className="button-group">
            {store.getButtons()}
        </div>
    )
})

export default ButtonList;