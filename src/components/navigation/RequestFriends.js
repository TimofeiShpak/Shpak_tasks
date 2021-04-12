import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';
import RequestItem from './RequestItem';

const RequestFriends = observer(() => {    
    let listData = store.userList.getFriendRequests();
    let listElements = listData.map((data) => {
        return  <RequestItem key={data.key} {...data} />
    });
    
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

