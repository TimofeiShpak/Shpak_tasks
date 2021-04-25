import { makeAutoObservable } from "mobx";
import api from "../../api/api";
import { actionList } from "../helpers/constants";
import { getId } from "../helpers/helpers";
import { ActionData, CommentData, EditedOption, State, TodoData } from "../helpers/interfaceList";

class Action {
  main: State;
  actionList: Array<ActionData> = actionList;

  constructor(main: State) {
    this.main = main;
    makeAutoObservable(this);
  }

  getActionData(data: CommentData | TodoData, action: string, type: string): ActionData {
    let time = `${new Date()}`;
    let { userSrc, userName } = this.main.user.userData;
    let { text } = data;
    let id = getId();
    let actionData: ActionData = { userSrc, userName, id, subtext: text, text: action, time };
    if (type === 'comment') {
      actionData.subtext = `${data.taskName}`;
      actionData.comment = text;
    } else if (type === 'editTask') {
      actionData.editedOptionList = this.main.todo.editedOptionList.slice();
      this.main.todo.editedOptionList.length = 0;
    } else if (type === 'deleteComment') {
      actionData.subtext = `${data.taskName}`;
    }
    return actionData;
  }

  addAction(data: CommentData | TodoData, action: string, type: string) {
    let actionData = this.getActionData(data, action, type);
    this.actionList.push(actionData);
    api.actionList.add(actionData);
  }

  optionName(option: EditedOption) {
    return option.name === 'text' ? 'description' : option.name;
  }

  setActionList(data: Array<ActionData>) {
    this.actionList = data;
  }
}

export default Action;