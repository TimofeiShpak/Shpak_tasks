import { observer } from 'mobx-react';

import store from '../../store/store';
import MainInfo from './MainInfo';


const Profile = observer(() => {
    let { imgSrc } = store.profileData.data
    return (
        <div className="profile-wrapper">
            <div className="profile">
                <img alt={imgSrc} src={imgSrc}></img>
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