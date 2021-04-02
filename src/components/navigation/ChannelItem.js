import { Link } from "react-router-dom";

import store from '../../store/store';

function ChannelItem(props) {
    let className = 'channel-item ';
    className += props.active === true ? 'channel-item_active' : '';
    return (
    <div>
        <li 
            className={className}
            onClick={() => store.channelData.index = props.index}
        >
            <Link to={`${props.text}`}>
                {props.text}
            </Link>
        </li>
    </div>
    );
}

export default ChannelItem;