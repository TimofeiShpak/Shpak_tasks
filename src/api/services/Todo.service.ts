import { AxiosInstance } from "axios";
import { Todo } from "../../store/helpers/interfaceList";

export class TodoService {
  request: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.request = instance;
  }

  getList(): Promise<Array<Todo>> {
    return this.request.get('/todoList')
  }

  add(todo: Todo) {
    return this.request.post('/todoList', todo);
  }

  delete(id: string) {
    return this.request.delete(`/todoList/${id}`);
  }

  edit(todo : Todo) {
    return this.request.put(`todoList/${todo.id}`, todo);
  }
}