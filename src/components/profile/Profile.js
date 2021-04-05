import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';
import MainInfo from './MainInfo';


const Profile = observer(() => {
    let { src, fullName } = store.profileData.data;
    
    return (
        <div className="profile-wrapper">
            <div className="profile">
                <div className="profile__img">
                    <img alt={fullName} src={src}></img>
                </div>
                <div className="profile__info">
                    <MainInfo />
                    <ul className="social-icons">
                        {store.profileData.getSocialIcons()}
                    </ul>
                    <div className="profile__group-btn">
                        <button className="btn-message">Message</button>
                        <button className="btn-rectangle"></button>
                    </div>
                    <div className="extra-info">
                        {store.profileData.getExtraInfo()}
                    </div>
                </div>
            </div>
            <button className="close-profile"></button>
        </div>
    );
})

export default Profile;