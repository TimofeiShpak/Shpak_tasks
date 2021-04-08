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
        this.isVisible = true;
        if (dataList) {
            this.profile = Object.assign({}, dataList);
        } else {
            this.profile = { 
                fullName : "user delete profile", 
                userName : "@deleted", 
                src : "./anonim.jpg", 
                isUser : true 
            };
        }
    }

    getButtons(isAskFriend, isAccept, isFriend, userName, profileName, id) {
        let addAskFriend = () => this.addAskFriend(userName, id);
        let removeFriend = () => this.main.user.removeFriend(userName);
        let cancelAsk = () => this.cancelAsk(userName, id);
        let addFriend = () => this.main.user.addFriend(profileName);
        let removeRequest = () => this.main.user.removeRequestFriend(profileName);

        switch(true) {
            case isAskFriend === true : return [{ func : cancelAsk, text : "Cancel ask" }];
            case isAccept === true : return [{func : addFriend, text : "Accept request"},
             {func : removeRequest, text : "Remove request" }];
            case isFriend === true : return [{func : removeFriend, text : "Remove from friends" }];
            default : return [{func : addAskFriend, text : "Add to friends" }];
        }
    }

    getProfileButtons() {
        let profileName = this.profile?.userName;
        let userName = this.main.user?.userData?.userName;
        this.isUser = userName === profileName || this.profile.isUser;
        let isAccept = this.main.user.userData.friendRequests[profileName] === true;

        let isFriend = false;
        let isAskFriend = false;
        let id;
        if (profileName !== '@deleted') {
            isFriend = this.profile?.friends[userName] === true;
            isAskFriend = this.profile?.friendRequests[userName] === true;
            id = this.main.userList.users.find((user) => user.userName === profileName).id;
        }

        let buttonList = this.getButtons(isAskFriend, isAccept, isFriend, userName, profileName, id);

        return buttonList.map((button) => {
                    let id = this.main.getId();
                    return ( 
                            <button key={id} className="btn" onClick={button.func}>
                                {button.text}
                            </button>
                        )
                    })    
    }

    addAskFriend(userName, id) {
        this.profile.friendRequests[userName] = true;
        api.profileData.changeProfileData(this.profile, id);
    }

    cancelAsk(userName, id) {
        delete this.profile.friendRequests[userName];
        api.profileData.changeProfileData(this.profile, id);
    }

    changeVisibleProfile() {
        this.isVisible = false;
    }
}

export default ProfileData;