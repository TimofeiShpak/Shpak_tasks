import { Link } from "react-router-dom";

import store from '../../mobx-multi/store';

function ChannelItem(props) {
    let handleClick = () => store.channelData.setIndex(props.index);

    return (
        <div>
            <li className={props.className} onClick={handleClick} >
                <Link to={`${props.text}`}>
                    {props.text}
                </Link>
            </li>
        </div>
    );
}

export default ChannelItem;