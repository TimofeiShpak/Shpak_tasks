import { AxiosInstance } from "axios";
import { Action } from "../../store/helpers/interfaceList";

export class ActionService {
  request: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.request = instance;
  }

  getList(): Promise<Array<Action>> {
    return this.request.get('/actionList');
  }

  add(data: Action) {
    return this.request.post('/actionList', data);
  }
}