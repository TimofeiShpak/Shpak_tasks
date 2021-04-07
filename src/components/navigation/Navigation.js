import User from './User';
import ChannelList from './ChannelList';
import Friends from './Friends';
import RequestFriends from './RequestFriends';

function Navigation() {
    return(
        <div className="navigation-wrapper">
            <div className="navigation">
                <User />
                <ChannelList />
                <RequestFriends />
                <Friends />
            </div>
        </div>
    )
}

export default Navigation;