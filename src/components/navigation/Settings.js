import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';

const Settings = observer(() => {
    let handleClick = store.user.settingsHandleClick;
    let isVisibleSetting = store.user.isVisibleSetting;
    return (
        <div className="settings">
            <button className="settings__btn" onClick={handleClick}></button>
            { isVisibleSetting && (
                <ul className="settings__list">
                    <li 
                        className="settings__item" 
                        onClick={store.user.logOut}>
                        Log out
                    </li>
                    <li 
                        className="settings__item" 
                        onClick={store.editProfile.editUserData}>
                        Edit profile
                    </li>
                    <li 
                        className="settings__item" 
                        onClick={store.user.deleteUser}>
                        Delete profile
                    </li>
                </ul>
            )}
        </div>
    )
});

export default Settings;