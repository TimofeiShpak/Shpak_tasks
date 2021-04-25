import axios, { AxiosInstance, AxiosResponse } from "axios";

import { TodoService } from './services/Todo.service'
import { UserService } from './services/User.service'
import { ActionService } from './services/Action.service'

const PATH = "http://localhost:3001";

axios.defaults.baseURL = PATH;

class API {
  request: AxiosInstance;
  todo: TodoService;
  userList: UserService;
  actionList: ActionService;

  constructor() {
    this.request = axios.create();
    this.setInterceptors();
    this.todo = new TodoService(this.request);
    this.userList = new UserService(this.request);
    this.actionList = new ActionService(this.request);
  }

  setInterceptors() {
    this.request.interceptors.response.use(this.clearData);
  }

  async clearData(res: AxiosResponse) {
    return res.data;
  }
}

const api = new API();
export default api;