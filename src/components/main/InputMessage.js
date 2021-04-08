import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';

const InputMessage = observer(() => {
    let textarea = store.inputMessage.getTextarea();
    let handleClickBtn = store.inputMessage.changeVisibleSmileContainer;
    let smiles = store.inputMessage.getSmiles();
    let isVisible = store.inputMessage.isVisible;

    return (
        <div className="input-message">
            {textarea}
            <div className="smiles">
                <button className="smiles__btn" onClick={handleClickBtn}></button>
                { isVisible && (
                    <div className="smiles__list">
                        {smiles}
                    </div>
                )}
            </div>
        </div>
    );
})

export default InputMessage;