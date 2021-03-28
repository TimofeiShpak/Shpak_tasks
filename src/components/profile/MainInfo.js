function MainInfo(props) {
    let classNameTitle = "profile__title ";
    classNameTitle += props.data.status === 'online' ? 'online' : '';
    return (
        <div className="profile__main-info">
            <div className={classNameTitle}>{props.data.fullName}</div>
            <div className="subtitle">{props.data.specialty}</div>
        </div>
    )
}

export default MainInfo;