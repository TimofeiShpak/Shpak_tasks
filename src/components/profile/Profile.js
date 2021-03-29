import { observer } from 'mobx-react';

import profileData from '../../store/profileData';
import ExtraInfo from './ExtraInfo';
import MainInfo from './MainInfo';
import SocialIcons from './SocialIcons';

const Profile = observer(() => {
    return (
        <div className="profile-wrapper">
            <div className="profile">
                <img alt={profileData.data.imgSrc} src={profileData.data.imgSrc}></img>
                <div className="profile__info">
                    <MainInfo />
                    <SocialIcons />
                    <div className="profile__group-btn">
                        <button className="btn-message">Message</button>
                        <button className="btn-rectangle"></button>
                    </div>
                    <ExtraInfo />
                </div>
            </div>
            <button className="close-profile"></button>
        </div>
    );
})

export default Profile;