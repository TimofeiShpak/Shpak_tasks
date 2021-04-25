import { observer } from "mobx-react";
import { INPUT_LIST_DATA } from "../../store/helpers/constants";
import store from "../../store/Store";

interface Props {
  data: string,
  index: number
}

const EditItem = observer((props: Props) => {
  let { data, index } = props;
  let { newTodo, updateNewTodo } = store.todo;
  let lists = store.user.lists;

  return (
    <select
    id={INPUT_LIST_DATA[index+2]}
    value={newTodo[data]} 
    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => updateNewTodo(event, data)}>
    {lists[data].map((item) => {
      return <option value={item} key={item}>{ item }</option>
    })}
  </select>
  )
});

export default EditItem;