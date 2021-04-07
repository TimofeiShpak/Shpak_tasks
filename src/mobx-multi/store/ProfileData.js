import { makeAutoObservable } from "mobx";
import api from "../../api/api";

import ItemInfo from '../../components/profile/ItemInfo';

const nameIcons = ['facebook', 'instagram', 'linkedin', 'twitter'];
const nameExtraInfo = ['userName', 'Email', 'Skype'];

class ProfileData {
    profile = {};
    isVisible = true;

    constructor(main) {
        makeAutoObservable(this);
        this.main = main

        this.changeProfile = this.changeProfile.bind(this);
        this.changeVisibleProfile = this.changeVisibleProfile.bind(this);
    };

    getExtraInfo() {
        let itemsInfo = [];
        for (let name of nameExtraInfo) {
            let dataElem = this.profile[name];
            if (dataElem) {
                let key = this.main.getId();
                let elem = <ItemInfo key={key} type={name} value={dataElem}/>
                itemsInfo.push(elem);
            }
        }
        return itemsInfo;
    }

    getData() {
        return this.profile;
    }

    getSocialIcons() {
        let icons = [];
        for (let name of nameIcons) {
            let data = this.profile[name];
            if (data) {
                let key = this.main.getId();
                let elem = <a className={`social-icon ${name}-icon`} key={key} href={data}> </a>;
                icons.push(elem);
            }
        }
        return icons;
    }

    changeProfile(id) {
        let dataList = this.main.userList.users.find((item) => item.id === id);

        if (dataList) {
            this.profile = Object.assign({}, dataList);
        } else {
            this.profile = { fullName : "user delete profile", src : "./anonim.jpg", isUser : true };
        }
    }

    getProfileButtons() {
        let profileName = this.profile.userName;
        let userName = this.main.user?.userData?.userName;
        let isUser = userName === profileName;
        let isFriend = this.profile.friends.includes(userName);
        let isAskFriend = this.profile.friendRequests.includes(userName);
        let id = this.main.userList.users.find((user) => user.userName === profileName).id;
        let isAccept = this.main.user.userData.friendRequests.includes(profileName);

        let addAskFriend = () => this.addAskFriend(userName, id);
        let removeFriend = () => this.main.user.removeFriend(userName);
        let addAddressee = () => this.main.inputMessage.addAddressee(userName);
        let cancelAsk = () => this.cancelAsk(userName, id);
        let addFriend = () => this.main.user.addFriend(profileName);
        let removeRequest = () => this.main.user.removeRequestFriend(profileName);
        return !isUser && (
            <div className="profile__group-btn">
                <div className="btn" onClick={addAddressee}>Message</div>
                { isAskFriend ?  (
                        <button className="btn" onClick={cancelAsk}>
                            Cancel ask
                        </button>
                    ) : isAccept ? (
                        <div>
                            <button className="btn" onClick={addFriend}>
                                Accept request
                                </button>
                            <button className="btn" onClick={removeRequest}>
                                Cancel request
                            </button>
                        </div>
                    ) : !isFriend ? (
                        <button className="btn" onClick={addAskFriend}>
                            Add to friends
                        </button> 
                    ) : (
                        <button className="btn" onClick={removeFriend}>
                            Remove from friends
                        </button>
                    )
                }
            </div>
        )
    }

    addAskFriend(userName, id) {
        this.profile.friendRequests.push(userName);
        api.profileData.changeProfileData(this.profile, id);
    }

    cancelAsk(userName, id) {
        let data = this.profile.friendRequests;
        let indexUser = data.findIndex((name) => name === userName);
        this.main.profileData.profile.friendRequests.splice(indexUser, 1);
        api.profileData.changeProfileData(this.profile, id);
    }

    changeVisibleProfile() {
        this.isVisible = false;
    }
}

export default ProfileData;