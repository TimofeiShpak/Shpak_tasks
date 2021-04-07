import store from '../../mobx-multi/store';

function UserItem(props) {
    let { className, data : { fullName, src, id } } = props; 
    let changeProfile = () => store.profileData.changeProfile(id);

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