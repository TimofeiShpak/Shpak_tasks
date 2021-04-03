import { observer } from 'mobx-react';
import store from '../../mobx-multi/store';

const Authorization = observer(() => {
    let listElements = store.userList.getUserList();
    return (
        <div className="authorization">
            <div className="authorization__title">Welcome</div>
            <div className="authorization__subtitle">Choose user</div>
            <ul className="authorization__user-list" onClick={store.user.chooseUser}>
                {listElements}
            </ul>
        </div>
    );
})

export default Authorization;