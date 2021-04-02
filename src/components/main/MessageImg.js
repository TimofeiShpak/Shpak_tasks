import store from '../../store/store';

function MessageImg(props) {
    let { dataLike, className } = store.messageList.getDataMessageImg(props);

    return (
        <div className="message__img-wrapper" data-like={dataLike}>
                <img alt={props.alt}
                    className={className} 
                    src={props.img.src} >
                </img>
         </div>
    );
}

export default MessageImg;