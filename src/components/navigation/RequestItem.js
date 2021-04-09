import store from '../../mobx-multi/store';
import UserItem from '../../components/navigation/UserItem';

function RequestItem(props) {
    let { className, data } = props;
    let addFriend = () => store.user.addFriend(data.id);
    let removeRequest = () => store.user.removeRequestFriend(data.id);

    return (
        <div className="request">
            <UserItem className={className} data={data} />
            <div>
                <button className="request__btn" onClick={addFriend}>✓</button>
                <button className="request__btn" onClick={removeRequest}>✘</button>
            </div>
        </div>
    );
}

export default RequestItem;