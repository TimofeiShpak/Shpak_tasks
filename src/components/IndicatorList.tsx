import { observer } from 'mobx-react';
import React from 'react';
import store from 'src/store/Store';

const IndicatorList = observer(() => {
    let elements = store.getIndicatorsElements();

    return (
        <div className="indicators">
            {elements}
        </div>
    )
})

export default IndicatorList;