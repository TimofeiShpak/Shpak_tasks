import { AxiosInstance } from "axios";
import { Channel } from "../../store/components/ChannelData";

export class Channels {
  request: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.request = instance;
  }

  getChannels(): Promise<Array<Channel>> {
    return this.request.get('/channelList')
  }
}