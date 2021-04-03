import store from '../../mobx-multi/store';

function UserItem(props) {
    let { fullName, className, src } = props; 
    let changeProfile = () => store.profileData.changeProfile(fullName);

    return (
        <li className={className} onClick={changeProfile} >
            <img 
                className="user-item__img" 
                alt={fullName} src={src} 
            />
            {fullName}
        </li>
    )
}

export default UserItem;