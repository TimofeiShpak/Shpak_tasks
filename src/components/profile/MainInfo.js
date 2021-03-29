import { observer } from 'mobx-react';

import profileData from '../../store/profileData';

const MainInfo = observer(() => {
    let classNameTitle = "profile__title ";
    classNameTitle += profileData.data.status === 'online' ? 'online' : '';
    return (
        <div className="profile__main-info">
            <div className={classNameTitle}>{profileData.data.fullName}</div>
            <div className="subtitle">{profileData.data.specialty}</div>
        </div>
    )
})

export default MainInfo;