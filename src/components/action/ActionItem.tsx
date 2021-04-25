import classNames from "classnames";
import { observer } from "mobx-react";
import { getTime } from "../../store/helpers/helpers";
import { ActionData } from "../../store/helpers/interfaceList";
import store from "../../store/Store";

const ActionItem = observer((props: ActionData) => {
  let { userName, userSrc, time, text, subtext, comment, editedOptionList } = props;
  let isUser = userName === store.user.userData.userName;
  let className = classNames({
    "icon-wrapper" : true,
    'icon_user': isUser,
  });
  let optionName = store.action.optionName;

  return (
    <div className="action">
    <div className={className}>
        <div 
          className="icon" 
          style={{ background: `url(${userSrc}) 50% 30% / cover` }}>
        </div>
    </div>
    <div className="action__info">
      <div className="action__topic">
        <div className="action__userName">{ userName }</div>
        <div className="action__time">- { getTime(time) }</div>
      </div>
      <div className="action__text">
        { text }:
        <span className="action__subtext">{ subtext }</span>
      </div>
      { comment && (
        <div className="action__comment">
          { comment }
        </div>
      )}
      { editedOptionList?.length && (
      <div className="action__changes">
        <div>Changes</div>
        <ul>
          { editedOptionList.map((option) => {
            return (
              <li 
                key={option.name}>
                  <span className="action__subtext">
                    { optionName(option) }: 
                  </span> 
                  { option.value }
              </li>
            )
          })}
        </ul>
      </div>
      )}
    </div>
  </div>
  )
});

export default ActionItem;