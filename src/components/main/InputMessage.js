import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';

const InputMessage = observer(() => {
    return (
        <div className="input-message">
            {store.inputMessage.getTextarea()}
            <button className="input-message__smiles"></button>
        </div>
    );
})

export default InputMessage;