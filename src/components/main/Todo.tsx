import { observer } from 'mobx-react';
import store from '../../store/Store';
import { TodoData } from '../../store/helpers/interfaceList';

const Todo = observer((props: TodoData) => {
  let { progress, status, text, author, creator, comments, id } = props;
  let progressClass = store.todoList.progressClass(progress);
  let statusClass = store.todoList.statusClass(status);
  let users = store.todoList.getTodoUsers(author, creator, comments);
  let changeIdActiveButton = () => store.todoList.changeIdActiveButton(id);
  let idActiveButton = store.todoList.idActiveButton;
  let data = { progress, status, text, creator };
  let { openEditTodo, deleteTodo } = store.todo;
  let openComments = () => store.comment.openCommentList(id, comments);
  let userName = store.user.userData.userName;
  let isUser = userName === author || userName === creator;

  return (
    <li className="todo">
    <p className="todo__text">{ text }</p>
    <span className={progressClass}>{ progress }</span>
    <span className={statusClass} >{ status }</span>
    <ul className="todo__userList">
      {users.map((user) => {
          return <li className="todo__user" key={user}>{ user }</li>
      })}
    </ul>
    <div className="todo__button-wrapper">
      <button className="todo__button" onClick={changeIdActiveButton}>
      </button>
      {idActiveButton === id && (
        <ul className="button-list">
          { isUser && (
            <>
              <li>
                <button className="button-list__item" onClick={() => openEditTodo(id, data)}>
                  Edit
                </button>
              </li>
              <li>
                <button className="button-list__item" onClick={() => deleteTodo(id)}>
                  Delete
                </button>
              </li>
            </>
          )}
          <li>
            <button className="button-list__item" onClick={openComments}>
              Comments
            </button>
          </li>
        </ul>
      )}
    </div>
  </li>
  )
})

export default Todo;