function MessageImg(props) {
    let dataLike = '😍 ' + props.img.likes;
    let className = "message__img";
    className += props.img.likes && " message__img_liked";
    return (
        <div className="message__img-wrapper" data-like={dataLike}>
                    <img 
                        className={className} 
                        src={props.img.src} >
                    </img>
         </div>
    );
}

export default MessageImg;