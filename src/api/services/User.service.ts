import { AxiosInstance } from "axios";
import { userData } from "../../store/helpers/interfaceList";

export class UserService {
  request: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.request = instance;
  }

  getList(): Promise<Array<userData>> {
    return this.request.get('/userList')
  }
}