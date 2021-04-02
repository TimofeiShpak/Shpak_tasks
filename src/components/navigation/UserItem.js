function UserItem(props) {
    return (
        <li className={props.className} style={{backgroundImage:`url(${props.src})`}}>
            {props.text}
        </li>
    )
}

export default UserItem;