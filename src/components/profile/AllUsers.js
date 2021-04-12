import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';
import UserItem from '../navigation/UserItem';

const AllUsers = observer(() => {
    let userListData = store.userList.getUserList();
    let userListElements = userListData.map((data) => {
        return  <UserItem key={data.key} {...data} />
    });

    return (
        <div className="users">
            <div className="users__title">
                Users 
                <span className="user__numbers">
                    {userListElements.length}
                </span>
            </div>
            <ul>
                {userListElements}
            </ul>
        </div>
        
    )
})

export default AllUsers;