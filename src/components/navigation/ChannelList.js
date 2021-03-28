import ChannelItem from './ChannelItem';

function ChannelList(props) {
    const listElements = props.channelsList.map((item, index) => {
        return <ChannelItem 
                    key={item.id} 
                    text={item.text} 
                    active={index === props.activeChannel ? true : false}
                    setActiveChannel={props.setActiveChannel}
                    channelsList={props.channelsList}
                />
    });
    return (
        <div className="channels">
            <div className="navigation__title">Channels <span className="number-channels">{listElements.length}</span></div>
            <ul>
                {listElements}
            </ul>
        </div>
    )
}

export default ChannelList;