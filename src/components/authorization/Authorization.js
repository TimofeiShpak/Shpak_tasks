import { observer } from 'mobx-react';
import store from '../../mobx-multi/store';

import RegisterForm from './RegisterForm';
import UserItem from '../navigation/UserItem';

const Authorization = observer(() => {
    let listData = store.userList.getFreeUsers();
    let listElements = listData.map((data) => {
        return  <UserItem key={data.key} {...data} />
    });
    
    return (
        <div className="authorization-wrapper">
            <div className="authorization__title">Welcome</div>
            <div className="authorization">
                <div className="authorization__choose-user">
                    <div className="authorization__subtitle">Choose user</div>
                    <ul className="authorization__user-list" onClick={store.user.chooseUser}>
                        {listElements}
                    </ul>
                </div>
                <p>or</p>
                <RegisterForm />
            </div>
        </div>
    );
})

export default Authorization;