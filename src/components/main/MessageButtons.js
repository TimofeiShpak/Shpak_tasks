import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';

const MessageButtons = observer((props) => {
  let { isActive, isMayEdit, isPresent } = store.message.getButtonsData(props.id, props.idUser);

  return (
    <div className="message__button-list">
        { isActive && (
            isMayEdit ? (
                <>
                    <button className="message__btn btn_edit">Edit</button>
                    <button className="message__btn btn_cancel hide">Cancel</button> 
                    <button className="message__btn btn_delete">Delete</button> 
                </>
            ) : isPresent && (
                <button className="message__btn btn_answer">Write</button>
            )
        )}
    </div>
    );
});

export default MessageButtons;