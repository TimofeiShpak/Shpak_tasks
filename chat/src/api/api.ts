  
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Users } from "./services/users.service";
import { Channels } from "./services/channel.service";
import { Messages } from "./services/messages.service";

const PATH = "http://localhost:3001";

class API {
  request: AxiosInstance;
  users: Users;
  channels: Channels;
  messages: Messages;

  constructor() {
    this.request = axios.create({
      baseURL: PATH
    });
    this.setInterceptors();
    this.users = new Users(this.request);
    this.channels = new Channels(this.request);
    this.messages = new Messages(this.request);
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