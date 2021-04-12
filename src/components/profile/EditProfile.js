import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';
import LabelItem from './LabelItem';

const EditProfile = observer(() => {
    let elementsData = store.editProfile.getElementsData();
    let checkData = (event) => store.editProfile.checkData(event);
    let isWrong = store.editProfile.isWrong;
    let elements = elementsData.map((data) => {
        return <input {...data} />
    });
    let labelsData = store.editProfile.getLabelsData();
    let labels = labelsData.map((data) => {
        return  <LabelItem key={data.id} option={data.option} />
    });

    return (
        <div className="edit-profile">
            <form className="form" onSubmit={checkData}>
                <fieldset>
                    <legend>Change profile: </legend>
                    <div className="list-wrapper">
                        <div className="label-list">
                            {labels}
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