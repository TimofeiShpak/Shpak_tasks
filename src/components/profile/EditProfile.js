import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';

const EditProfile = observer(() => {
    let elements = store.editProfile.getElements();
    let checkData = (event) => store.editProfile.checkData(event);
    let isWrong = store.editProfile.isWrong;
    
    return (
        <div className="edit-profile">
            <form className="form" onSubmit={checkData}>
                <fieldset>
                    <legend>Change profile: </legend>
                    <div className="list-wrapper">
                        <div className="label-list">
                            {store.editProfile.getLabelList()}
                        </div>
                        <div className="input-list">
                        { isWrong && (
                                <div className="form__wrong">userName is busy, write another</div>
                            )
                        }
                            {elements}
                        </div>
                    </div>
                    <input className="btn-submit" type="submit" value="save"></input> 
                </fieldset>
            </form>
        </div>
    )
});

export default EditProfile;