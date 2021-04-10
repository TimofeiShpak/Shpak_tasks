import React from 'react';
import { observer } from 'mobx-react';

import store from 'src/store/Store';

const Modal = observer(() => {
    let className = store.getClassNameModal();
    let setShowModal = () => store.setShowModal(false);

    return (
        <div className={className}>
            <div className="modal">
                <div>Вы проиграли</div>
                <button className="btn btn-modal" onClick={setShowModal}>ОК</button>
            </div>
        </div>
    );
})

export default Modal;