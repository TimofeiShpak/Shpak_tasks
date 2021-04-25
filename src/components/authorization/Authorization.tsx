import { observer } from 'mobx-react';
import { Link } from "react-router-dom";
import User from './User';
import store from '../../store/Store';

const Authorization = observer(() => {
  let users = store.user.userList;

  return (
    <div className="authorization">
      <div>Choose user</div>
      <div className="user-list">
        <Link to="/home">
          {users.map((user) => {
            return <User key={user.id} {...user} />
          })}
        </Link>
      </div>
    </div>
  )
});

export default Authorization;