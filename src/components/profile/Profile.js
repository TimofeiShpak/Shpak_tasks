import ExtraInfo from './ExtraInfo';
import MainInfo from './MainInfo';
import SocialIcons from './SocialIcons';

function Profile(props) {
    return (
        <div className="profile-wrapper">
            <div className="profile">
                <img alt={props.data.fullName} src={props.data.imgSrc}></img>
                <div className="profile__info">
                    <MainInfo data={props.data}/>
                    <SocialIcons data={props.data.socialSrc}/>
                    <div className="profile__group-btn">
                        <button className="btn-message">Message</button>
                        <button className="btn-rectangle"></button>
                    </div>
                    <ExtraInfo data={props.data.extraInfo}/>
                </div>
            </div>
            <button className="close-profile"></button>
        </div>
    );
}

export default Profile;