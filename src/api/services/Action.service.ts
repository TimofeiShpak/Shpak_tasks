import { AxiosInstance } from "axios";
import { ActionData } from "../../store/helpers/interfaceList";

export class ActionService {
  request: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.request = instance;
  }

  getList(): Promise<Array<ActionData>> {
    return this.request.get('/actionList');
  }

  add(data: ActionData) {
    return this.request.post('/actionList', data);
  }
}