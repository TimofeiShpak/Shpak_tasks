import { Link } from "react-router-dom";

function ChannelItem(props) {
    let className = 'channel-item ';
    let indexActiveChannel = props.channelsList.findIndex((channel) => channel.text === props.text);
    className += props.active === true ? 'channel-item_active' : '';
    return (
    <div>
        <li 
            className={className} onClick={() => props.setActiveChannel(indexActiveChannel)}>
            <Link to={`${props.text}`}>
                {props.text}
            </Link>
        </li>
    </div>
    );
}

export default ChannelItem;