import ListItem from './ListItem';

function NomadList(props) {
    const listElements = props.list.map((item) => {
        return <ListItem 
                    key={item.id} 
                    src={item.src} 
                    text={item.text} 
                />
    });
    return (
        <div className="nomad-wrapper">
            <div className="nomad-list">
                <button className="nomad-btn list-open">
                    <div>
                        Nomad List
                    </div>
                    <span></span>
                </button>
                <ul>
                    {listElements}
                </ul>
            </div>
            <button className="settings"></button>
        </div>
    )
}

export default NomadList;