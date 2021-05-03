import { AxiosInstance } from "axios";
import { Message } from "../../store/components/MessageListData";

export class Messages {
  request: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.request = instance;
  }

  getMessages(name: string): Promise<Array<Message>> {
    return this.request.get(`/messages-${name}`)
  }

  deleteMessage(name: string, id: string) {
    this.request.delete(`messages-${name}/${id}`);
  }

  addMessage(name: string, message: Message) {
    this.request.post(`messages-${name}`, message);
  }

  editMessage(name: string, message: Message) {
    this.request.put(`messages-${name}/${message.id}`, message);
  }
}