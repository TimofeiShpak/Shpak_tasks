import { AxiosInstance } from "axios";
import { User } from "../../store/components/users/user.helpers";

export class Users {
  request: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.request = instance;
  }

  getUsers(): Promise<Array<User>> {
    return this.request.get('/userList');
  }

  updateUser(data: User) {
    this.request.put(`/userList/${data.id}`, data);
  }

  deleteUser(id: string) {
    this.request.delete(`/userList/${id}`);
  }

  addUser(user: User) {
    this.request.post('/userList', user);
  }
}