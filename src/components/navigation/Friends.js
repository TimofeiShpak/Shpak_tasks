import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';
import UserItem from './UserItem';

const Friends = observer(() => {
    let listData = store.userList.getFriends();
    let listElements = listData.map((data) => {
        return  <UserItem key={data.key} {...data} />
    });
    
    return (
        <div className="friends">
            <div className="navigation__title">
                Friends 
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

export default Friends;