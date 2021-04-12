import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';
import SocialLinks from './SocialLinks';
import ExtraInfo from './ExtraInfo';
import ProfileButtons from './ProfileButtons';
import AllUsers from './AllUsers';

const Profile = observer(() => {
    let { src, fullName, specialty, status } = store.profileData.getData();
    let changeVisibleProfile = store.profileData.changeVisibleProfile;
    let { isVisible } = store.profileData;
    
    return ( isVisible &&
        <div className="profile-wrapper">
            <div className="profile">
                <div className="profile__img">
                    <img alt={fullName} src={src}></img>
                </div>
                <div className="profile__info">
                    <div className="profile__main-info">
                        <div className={`profile__title ${status}`}>{fullName}</div>
                        <div className="subtitle">{specialty}</div>
                    </div>
                    <SocialLinks />
                    <ProfileButtons />
                    <ExtraInfo />
                </div>
                <AllUsers />
            </div>
            <button className="close-profile" onClick={changeVisibleProfile}></button>
        </div>
    );
})

export default Profile;