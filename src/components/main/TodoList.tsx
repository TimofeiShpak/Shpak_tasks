import classNames from 'classnames';
import { observer } from 'mobx-react';
import React from 'react'
import store from '../../store/Store';
import Todo from './Todo'

interface Props {
  isActive: boolean
}

const TodoList = observer((props: Props) => {
  let { isActive } = props;
  let data = store.todoList.getTodoList(isActive);
  let className = classNames({
    'main-item': true,
    'main-item_inactive': !isActive
  });

  return (
    <section className={className}>
      <div className="main-item__title">
        { isActive ? 'On Hold' : 'Completed' }
        <span className="inactive">inactive</span>
      </div>
      <ul className="todo__list">
        { data.map((todo) => {
            return <Todo key={todo.id} {...todo} />
        })}
      </ul>
    </section>
  )
})

export default TodoList;