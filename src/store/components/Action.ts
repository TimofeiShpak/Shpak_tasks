import api from "../../api/api";
import { getId } from "../helpers/helpers";
import { Action, Comment, State, Todo } from "../helpers/interfaceList";

function getActionData(state: State, data: Comment | Todo, action: string, type: string): Action {
  let time = `${new Date()}`;
  let { userSrc, userName } = state.userData;
  let { text } = data;
  let id = getId();
  let actionData: Action = { userSrc, userName, id, subtext: text, text: action, time };
  if (type === 'comment') {
    actionData.subtext = data.taskName;
    actionData.comment = text;
  } else if (type === 'editTask') {
    actionData.editedOptionList = state.editedOptionList.slice();
    state.editedOptionList.length = 0;
  }
  return actionData;
}

function addAction(state: State, data: Comment | Todo, action: string, type: string) {
  let actionData = getActionData(state, data, action, type);
  state.actionList.push(actionData);
  api.actionList.add(actionData);
}

export { addAction }