import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';

const MainInfo = observer(() => {
    let { classNameTitle, fullName, specialty } = store.profileData.getMainInfo();

    return (
        <div className="profile__main-info">
            <div className={classNameTitle}>{fullName}</div>
            <div className="subtitle" onClick={store.profileData.onClick}>{specialty}</div>
        </div>
    )
})

export default MainInfo;