import { observer } from 'mobx-react';

import store from '../../store/store';

const User = observer(() => {
    let  { className, name, src } = store.userList.getUserData();
    return (
        <div className="user-wrapper">
            <div className={className} style={{backgroundImage:`url(${src})`}}>
                {name}
            </div>
            <button className="settings"></button>
        </div>
    )
});

export default User;