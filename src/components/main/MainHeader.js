import Form from './Form';

function MainHeader(props) {
    return (
        <div className="main-header">
            <div className="main-header__topic">
                <div className="main-header__title">{props.content.name}</div>
                <button className="bookmark"></button>
            </div>
            <div className="main-header__content">
                <div className="number-subscribers">{props.content.numberSubscribers}</div>
                <Form />
                <button className="notifications"></button>
                <button className="else-btn"></button>
            </div>
        </div>
    );
}

export default MainHeader;