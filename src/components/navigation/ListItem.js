function ListItem(props) {
    let className = 'list-item ' + props.text.toLowerCase().split(' ').join('-');
    return (
        <li className={className}>
            {props.text}
        </li>
    )
}

export default ListItem;