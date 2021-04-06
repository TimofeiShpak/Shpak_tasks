import ProfileData from './store/ProfileData';
import UserList from './store/UserList';
import MessageList from './store/MessageList';
import ChannelData from './store/ChannelData';
import InputMessage from './store/InputMessage';
import User from './store/User';
import Message from './store/Message';
import RegisterForm from './store/RegisterForm';
import EditProfile from './store/EditProfile';

export class MultiStore {
    constructor() {
        this.messageList = new MessageList(this);
        this.message = new Message(this);
        this.channelData = new ChannelData(this);
        this.inputMessage = new InputMessage(this);
        this.userList = new UserList(this);
        this.user = new User(this);
        this.profileData = new ProfileData(this);
        this.registerForm = new RegisterForm(this);
        this.editProfile = new EditProfile(this);
    }

    getId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
            return v.toString(16);
        });
    }
}

const store = new MultiStore();
export default store;