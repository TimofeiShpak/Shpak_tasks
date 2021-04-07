import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';

const RequestFriends = observer(() => {    
    let listElements = store.userList.getFriendRequests();
    
    return listElements.length > 0 && (
        <div className="friends">
            <div className="navigation__title">
                Friend requests
                <span className="number-channels">
                    {listElements.length}
                </span>
            </div>
            <ul>
                {listElements}
            </ul>
        </div>
    )
})

export default RequestFriends;

