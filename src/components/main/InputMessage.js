import { observer } from 'mobx-react';

import activeChannel from '../../store/activeChannel';

const InputMessage = observer(() => {
    let placeholder = `Message in  #${activeChannel.name}`;
    return (
        <div className="input-message">
            <button className="input-message__file"></button>
            <button className="input-message__voice"></button>
            <textarea rows="1" className="input-message__textarea" type="text" placeholder={placeholder}></textarea>
            <button className="input-message__smiles"></button>
        </div>
    );
})

export default InputMessage;