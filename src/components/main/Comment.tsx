import classNames from "classnames";
import { observer } from "mobx-react";
import { getTime } from "../../store/helpers/helpers";
import { CommentData } from "../../store/helpers/interfaceList";
import store from "../../store/Store";

const CommentItem = observer((props: CommentData) => {
  let currentUserName = store.user.userData.userName;
  let { userName, userSrc, time, id, text } = props;
  let isUser =  userName === currentUserName;
  let className = classNames({
    "icon-wrapper": true,
    "icon_user": isUser
  });
  let { resetComment, deleteComment, setEditComment, idEditComment } = store.comment;

  return (
    <li className="comment">
    <div className={className}>
        <div 
          className="icon"
          style={{ background: `url(${userSrc}) 50% 30% / cover` }}>
        </div>
    </div>
    <div className="comment__info">
      <div className="comment__topic">
        <div className="comment__userName">{ userName }</div>
        <div className="comment__time">- { getTime(time) }</div>
        <div className="comment__buttons">
          { isUser && (
            <>
              { (idEditComment === id) ? (
                  <button 
                    className="comment__button" 
                    onClick={resetComment}>
                    cancel
                  </button>
                ) : (
                  <button 
                    className="comment__button"
                    onClick={() => setEditComment(id, text)}>
                    edit
                  </button>
              )}
              <button 
                className="comment__button"
                onClick={() => deleteComment(id)}>
                delete
              </button>
            </>
          )}
        </div>
      </div>
      <div className="comment__text">{ text }</div>
    </div>
  </li>
  )
})

export default CommentItem;