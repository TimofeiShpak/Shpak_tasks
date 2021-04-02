import MainHeader from './MainHeader';
import MessageList from './MessageList';
import InputMessage from './InputMessage';

function Main() {
    return (
        <div className="main">
            <MainHeader />
            <MessageList />
            <InputMessage />
        </div>
    );
}

export default Main;