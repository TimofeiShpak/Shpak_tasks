import FriendItem from './FriendItem';

function Friends(props) {
    const listElements = props.friendsList.map((item) => {
        return <FriendItem 
                    key={item.id} 
                    text={item.text} 
                    status={item.status} 
                    src={item.src}
                />
    });
    return (
        <div className="friends">
            <div className="navigation__title">Friends <span className="number-channels">{listElements.length}</span></div>
            <ul>
                {listElements}
            </ul>
        </div>
    )
}

export default Friends;