import { observer } from 'mobx-react';
import { userData } from '../../store/helpers/interfaceList';
import store from '../../store/Store';

const User = observer((props: userData) => {
  let { userName, userSrc, id } = props;
  let setUserData = () => store.user.setUserData(id);

  return (
    <div className="user-link" onClick={setUserData}>
      <div className="icon-wrapper">
        <div 
            className="icon"
            style={{ background: `url(${userSrc}) 50% 30% / cover` }}>
          </div>
        </div>
        <div className="action__userName">{ userName }</div>
    </div>
  )
});

export default User;