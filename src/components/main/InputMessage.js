import { observer } from 'mobx-react';

import store from '../../store/store';

const InputMessage = observer(() => {
    return (
        <div className="input-message">
            <button className="input-message__file"></button>
            <button className="input-message__voice"></button>
            {store.inputMessage.getTextarea()}
            <button className="input-message__smiles"></button>
        </div>
    );
})

export default InputMessage;