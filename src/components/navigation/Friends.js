import { observer } from 'mobx-react';

import store from '../../store/store';

const Friends = observer(() => {
    let listElements = store.userList.getUserList();
    return (
        <div className="friends">
            <div className="navigation__title">Friends <span className="number-channels">{listElements.length}</span></div>
            <ul>
                {listElements}
            </ul>
        </div>
    )
})

export default Friends;