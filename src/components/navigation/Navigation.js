import User from './User';
import ChannelList from './ChannelList';
import Friends from './Friends';

function Navigation() {
    return(
        <div className="navigation-wrapper">
            <div className="navigation">
                <User />
                <ChannelList />
                <Friends />
            </div>
        </div>
    )
}

export default Navigation;