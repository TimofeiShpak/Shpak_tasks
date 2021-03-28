import NomadList from './NomadList';
import ChannelList from './ChannelList';
import Friends from './Friends';

function Navigation(props) {
    return(
        <div className="navigation-wrapper">
            <div className="navigation">
                <NomadList list = {props.data.list} />
                <ChannelList 
                    channelsList = {props.data.channelsList} 
                    activeChannel = {props.activeChannel} 
                    setActiveChannel={props.setActiveChannel} 
                />
                <Friends friendsList = {props.data.friendsList} />
            </div>
        </div>
    )
}

export default Navigation;