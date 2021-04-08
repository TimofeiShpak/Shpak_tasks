import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';

const RequestFriends = observer(() => {    
    let listElements = store.userList.getFriendRequests();
    let length = Object.keys(listElements).length;
    
    return length > 0 && (
        <div className="friends">
            <div className="navigation__title">
                Friend requests
                <span className="number-channels">
                    {length}
                </span>
            </div>
            <ul>
                {listElements}
            </ul>
        </div>
    )
})

export default RequestFriends;

