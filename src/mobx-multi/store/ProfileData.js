import { makeAutoObservable } from "mobx";

import ItemInfo from '../../components/profile/ItemInfo';

const nameIcons = ['facebook', 'instagram', 'linkedin', 'twitter'];
const nameExtraInfo = ['userName', 'Email', 'Skype'];

class ProfileData {
    profileData = {};
    constructor(main) {
        makeAutoObservable(this);
        this.main = main

        this.changeProfile = this.changeProfile.bind(this);
    };

    getExtraInfo() {
        let itemsInfo = [];
        for (let name of nameExtraInfo) {
            let dataElem = this.profileData[name];
            if (dataElem) {
                let key = this.main.getId();
                let elem = <ItemInfo key={key} type={name} value={dataElem}/>
                itemsInfo.push(elem);
            }
        }
        return itemsInfo;
    }

    getData() {
        return this.profileData;
    }

    getSocialIcons() {
        let icons = [];
        for (let name of nameIcons) {
            let data = this.profileData[name];
            if (data) {
                let key = this.main.getId();
                let elem = <a className={`social-icon ${name}-icon`} key={key} href={data.src}> </a>;
                icons.push(elem);
            }
        }
        return icons;
    }

    changeProfile(userName) {
        let dataList = this.main.userList.userList.find((item) => item.userName === userName);
        let dataUser = this.main.user.userData[0];
        if (dataList) {
            this.profileData = dataList;
        } else if (!dataList && userName === dataUser.userName) {
            this.profileData = this.main.user.userData[0];
            this.profileData.isUser = true;
        } else {
            this.profileData = { fullName : "undefined user", src : "./anonim.jpg", isUser : true };
        }
    }
}

export default ProfileData;