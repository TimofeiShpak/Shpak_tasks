function Modal(props) {
    let classNameWrapper = "modal-wrapper";
    classNameWrapper += props.isShowModal === false ? " hide" : "";
    return (
        <div className={classNameWrapper}>
            <div className="modal">
                <div>Вы проиграли</div>
                <button className="btn btn-modal" onClick={() => props.setShowModal(false)}>ОК</button>
            </div>
        </div>
    );
}

export default Modal;