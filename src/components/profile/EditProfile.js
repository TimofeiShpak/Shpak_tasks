import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';

const EditProfile = observer(() => {
    let elements = store.editProfile.getElements();
    let saveProfile = (event) => store.editProfile.saveProfile(event)
    
    return (
        <div className="edit-profile">
            <form className="form" onSubmit={saveProfile}>
                <fieldset>
                    <legend>Change profile: </legend>
                    <div className="list-wrapper">
                        <div className="label-list">
                            {store.editProfile.getLabelList()}
                        </div>
                        <div className="input-list">
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