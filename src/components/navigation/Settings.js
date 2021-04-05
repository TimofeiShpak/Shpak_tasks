import store from '../../mobx-multi/store';

function Settings() {
    let handleClick = (event) => store.user.settingsHandleClick(event);

    return (
        <button className="settings settings_close" onClick={handleClick}>
            <ul className="settings__list">
                <li className="settings__item" onClick={store.user.logOut}>Log out</li>
                <li className="settings__item">Edit profile</li>
            </ul>
        </button>
    )
}

export default Settings;