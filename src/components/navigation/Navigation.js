import NomadList from './NomadList';
import ChannelList from './ChannelList';
import Friends from './Friends';

function Navigation() {
    return(
        <div className="navigation-wrapper">
            <div className="navigation">
                <NomadList />
                <ChannelList />
                <Friends />
            </div>
        </div>
    )
}

export default Navigation;