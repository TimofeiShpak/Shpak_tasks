import { observer } from 'mobx-react-lite';
import { INPUT_LIST_DATA } from '../../store/helpers/constants';
import store from '../../store/Store';
import EditItem from './EditItem';

const EditTodo = observer(() => {
  let author = store.user.userData.userName;
  let { newTodo, updateNewTodo, closeEditTodo, saveTodo } = store.todo;
  
  return (
    <div className="modal-wrapper">
    <div className="modal">
      <div>New Task</div>
      <form className="modal__form" onSubmit={saveTodo}>
        <div className="modal__content">
          <div className="label-list">
            {INPUT_LIST_DATA.map((data) => {
              return <label key={data} className={data} htmlFor={data}>{data}</label>
            })}
          </div>
          <div className="input-list">
            <div>{ author }</div>
            <textarea
              className="modal__textarea" 
              id="text" 
              value={newTodo.text} 
              onInput={(event: React.ChangeEvent<HTMLTextAreaElement>) => updateNewTodo(event, 'text')}
              required
            />
            {INPUT_LIST_DATA.slice(2).map((data, index) => {
              return <EditItem data={data} index={index} key={data}/>
            })}
          </div>
        </div>
        <input type="submit" className="modal__btn_add" value="Save" />
        <button 
          type="reset" 
          className="modal__btn"
          onClick={closeEditTodo}>
            Cancel
        </button>
      </form>
    </div>
  </div>
  )
});

export default EditTodo;