import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';

const Profile = observer(() => {
    let { src, fullName, isUser, specialty } = store.profileData.getData();
    
    return (
        <div className="profile-wrapper">
            <div className="profile">
                <div className="profile__img">
                    <img alt={fullName} src={src}></img>
                </div>
                <div className="profile__info">
                    <div className="profile__main-info">
                        <div className="profile__title online">{fullName}</div>
                        <div className="subtitle">{specialty}</div>
                    </div>
                    <ul className="social-icons">
                        {store.profileData.getSocialIcons()}
                    </ul>
                    { !isUser && (
                            <div className="profile__group-btn">
                                <button className="btn-message">Message</button>
                                <button className="btn-rectangle"></button>
                            </div>
                        )
                    }
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