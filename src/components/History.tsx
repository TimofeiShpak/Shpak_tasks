import { observer } from 'mobx-react';
import React from 'react';
import store from 'src/store/Store';

const History = observer(() => {
    return (
        <div className="history">
            {store.allActivities}
        </div>
    );
});

export default History;