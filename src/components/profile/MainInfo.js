import { observer } from 'mobx-react';

import store from '../../store/store';

const MainInfo = observer(() => {
    let { classNameTitle, fullName, specialty } = store.profileData.getMainInfo();

    return (
        <div className="profile__main-info">
            <div className={classNameTitle}>{fullName}</div>
            <div className="subtitle">{specialty}</div>
        </div>
    )
})

export default MainInfo;