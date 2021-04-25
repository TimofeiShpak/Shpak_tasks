import { observer } from 'mobx-react';
import store from '../../store/Store';
import CommentList from './CommentList';
import EditTodo from './EditTodo';
import TodoList from './TodoList';

const Main = observer(() => {
  let isShowEdit = store.todo.isShowEdit;
  let isShowComments = store.comment.isShowComments;
  let changeShowEdit = store.todo.changeShowEdit;

  return (
    <main className="main">
    <div className="main__header">
      <div className="main__title">
        You’ve got 
        <span className="todo-number"> 7 task </span> 
        today
      </div>
      <button className="main__btn_add" onClick={changeShowEdit}>Add New</button>
    </div>
    <div className="all-todos">
      <TodoList isActive={true}/>
      <TodoList isActive={false} />
    </div>
    { isShowEdit && <EditTodo /> }
    { isShowComments && <CommentList /> }
  </main>
  )
})

export default Main;