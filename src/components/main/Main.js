import MainHeader from './MainHeader';
import AllMessages from './AllMessages';
import InputMessage from './InputMessage';

function Main(props) {
    return (
        <div className="main">
            <MainHeader content = {props.content} />
            <AllMessages messages = {props.content.messages} />
            <InputMessage name={props.content.name} />
        </div>
    );
}

export default Main;