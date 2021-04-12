import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';

const ProfileButtons = observer(() => {
    let { isUser } = store.profileData;
    let { userName } = store.profileData.getData();
    let buttonsData = store.profileData.getProfileButtons();
    let addAddressee = () => store.inputMessage.addAddressee(userName);

    let buttonsElements = buttonsData.map((data) => {
        return (
            <button key={data.id} className="btn" onClick={data.button.func}>
                {data.button.text}
            </button>
        )
    });

    return (
        <>
            { !isUser && (
                <div className="profile__group-btn">
                    <button className="btn" onClick={addAddressee}>Message</button>
                    {buttonsElements} 
                </div> 
            )}
        </>
    )
})

export default ProfileButtons;