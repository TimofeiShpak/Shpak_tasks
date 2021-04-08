import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';

const Profile = observer(() => {
    let { src, fullName, specialty, status, userName } = store.profileData.getData();
    let buttons = store.profileData.getProfileButtons();
    let userList = store.userList.getUserList();
    let changeVisibleProfile = store.profileData.changeVisibleProfile;
    let addAddressee = () => store.inputMessage.addAddressee(userName);
    let { isVisible, isUser } = store.profileData;
    
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
                    <ul className="social-icons">
                        {store.profileData.getSocialIcons()}
                    </ul>
                   { !isUser && (
                        <div className="profile__group-btn">
                            <button className="btn" onClick={addAddressee}>Message</button>
                            {buttons} 
                        </div> 
                    )}
                    <div className="extra-info">
                        {store.profileData.getExtraInfo()}
                    </div>
                </div>
                <div className="users">
                    <div className="users__title">
                        Users 
                        <span className="user__numbers">
                            {userList.length}
                        </span>
                    </div>
                    <ul>
                        {userList}
                    </ul>
                </div>
            </div>
            <button className="close-profile" onClick={changeVisibleProfile}></button>
        </div>
    );
})

export default Profile;