import axios, { AxiosInstance, AxiosResponse } from "axios";

import { TodoService } from './services/Todo.service'
import { UserService } from './services/User.service'
import { ActionService } from './services/Action.sevice'

const PATH = "http://localhost:3001";

class API {
  request: AxiosInstance;
  todo: TodoService;
  userList: UserService;
  actionList: ActionService;

  constructor() {
    this.request = axios.create({
      baseURL: PATH
    });
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