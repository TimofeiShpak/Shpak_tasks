function FriendItem(props) {
    let className = "friend-item ";
    className += props.status === 'online' ? 'friend-item-active' : '';
    return (
        <li className={className} style={{backgroundImage:`url(${props.src})`}}>
            {props.text}
        </li>
    )
}

export default FriendItem;