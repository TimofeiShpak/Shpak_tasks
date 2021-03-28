function ItemInfo(props) {
    return (
        <div>
            <div className="type-info">{props.type}</div>
            <div>{props.value}</div>
        </div>
    )
}

export default ItemInfo;