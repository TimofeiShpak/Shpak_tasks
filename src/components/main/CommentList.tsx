import { observer } from "mobx-react";
import store from "../../store/Store";
import CommentItem from "./Comment";

const CommentList = observer(() => {
  let { comments, comment, updateComment, closeEditComment, saveComment } = store.comment;

  return (
    <div className="modal-wrapper">
    <div className="modal">
      <div>Comments</div>
      <div className="comments-wrapper">
        { comments.length > 0 ? (
        <ul className="comment-list">
          { comments.map((comment) => {
              return <CommentItem key={comment.id} { ...comment } /> 
            }
          )}
        </ul> 
        ) : (
          <div>no comments</div>
        )}
      </div>
      <form onSubmit={saveComment}>
        <textarea 
          className="modal__textarea"
          value={comment}
          onInput={updateComment}
          required
          placeholder="Write your comment"
        />
        <div className="modal__button-list">
          <input type="submit" className="modal__btn" value="Save comment" />
          <input type="reset" className="modal__btn" onClick={closeEditComment} value="Close" />
        </div>
      </form> 
    </div>
  </div>
  )
})

export default CommentList;