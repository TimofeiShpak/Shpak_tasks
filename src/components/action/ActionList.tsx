import { observer } from "mobx-react";
import store from "../../store/Store";
import ActionItem from "./ActionItem";

const ActionList = observer(() => {
  let actionList = store.action.actionList
  return (
    <div className="action-list">
      { actionList.map((action) => {
        return <ActionItem key={action.id} {...action} />
      })}
  </div>
  )
});

export default ActionList;