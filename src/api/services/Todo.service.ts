import { AxiosInstance } from "axios";
import { TodoData } from "../../store/helpers/interfaceList";

export class TodoService {
  request: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.request = instance;
  }

  getList(): Promise<Array<TodoData>> {
    return this.request.get('/todoList')
  }

  add(todo: TodoData) {
    return this.request.post('/todoList', todo);
  }

  delete(id: string) {
    return this.request.delete(`/todoList/${id}`);
  }

  edit(todo: TodoData) {
    return this.request.put(`todoList/${todo.id}`, todo);
  }
}