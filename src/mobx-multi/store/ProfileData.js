import { makeAutoObservable } from "mobx";
import api from "../../api/api";

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

    getExtraInfoData() {
        let itemsInfo = [];
        for (let name of nameExtraInfo) {
            let dataElem = this.profile[name];
            if (dataElem) {
                let key = this.main.getId();
                let elemData = { key, type: name, value: dataElem };
                itemsInfo.push(elemData);
            }
        }
        return itemsInfo;
    }

    getData() {
        return this.profile;
    }

    getSocialLinksData() {
        let linksData = [];
        for (let name of nameIcons) {
            let data = this.profile[name];
            if (data) {
                let key = this.main.getId();
                let elemData = { name, key, href: data} 
                linksData.push(elemData);
            }
        }
        return linksData;
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

    getButtons(isAskFriend, isAccept, isFriend, idUser, idProfile) {
        let addAskFriend = () => this.addAskFriend(idUser);
        let removeFriend = () => this.main.user.removeFriend(idUser);
        let cancelAsk = () => this.cancelAsk(idUser);
        let addFriend = () => this.main.user.addFriend(idProfile);
        let removeRequest = () => this.main.user.removeRequestFriend(idProfile);

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
        let idProfile = this.profile?.id;
        let isAccept = this.main.user.userData.friendRequests[idProfile] === true;
        let idUser = this.main.user.userData?.id;
        let isFriend = false;
        let isAskFriend = false;

        if (profileName !== '@deleted') {
            isFriend = this.profile?.friends[idUser] === true;
            isAskFriend = this.profile?.friendRequests[idUser] === true;
        }

        let buttonList = this.getButtons(isAskFriend, isAccept, isFriend, idUser, idProfile);

        return buttonList.map((button) => {
            let id = this.main.getId();
            return { id, button }
        })    
    }

    addAskFriend(id) {
        this.profile.friendRequests[id] = true;
        api.profileData.changeProfileData(this.profile, this.profile.id);
    }

    cancelAsk(id) {
        delete this.profile.friendRequests[id];
        api.profileData.changeProfileData(this.profile, this.profile.id);
    }

    changeVisibleProfile() {
        this.isVisible = false;
    }
}

export default ProfileData;