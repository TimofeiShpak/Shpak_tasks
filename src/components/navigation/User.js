import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';
import Settings from './Settings';

const User = observer(() => {
    let  { className, fullName, src } = store.user.getUserData();
    
    return (
        <div className="user-wrapper">
            <div className={className} >
                <img className="user-item__img" alt={fullName} src={src}></img>
                {fullName}
            </div>
            <Settings />
        </div>
    )
});

export default User;