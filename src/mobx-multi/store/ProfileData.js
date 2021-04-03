import { makeAutoObservable } from "mobx";

import ItemInfo from '../../components/profile/ItemInfo';

const nameIcons = ['facebook', 'instagram', 'linkedin', 'twitter'];

class ProfileData {
    profileData = {};
    constructor(main) {
        makeAutoObservable(this);
        this.main = main

        this.changeProfile = this.changeProfile.bind(this);
    };

    get data() {
        return this.profileData;
    };

    getExtraInfo() {
        let itemsInfo = [];
        let data = this.profileData.extraInfo;
        for (let dataElem in data) {
            let key = this.main.getId();
            let elem = <ItemInfo key={key} type={dataElem} value={data[dataElem]}/>
            itemsInfo.push(elem);
        }
        return itemsInfo;
    }

    getMainInfo() {
        let { status, fullName, specialty } = this.profileData;
        let classNameTitle = this.main.classNames({
            "profile__title": true,
            "online" : status === 'online'
        });
        return { classNameTitle, fullName, specialty };
    }

    getSocialIcons() {
        let { socialSrc } = this.profileData;
        let icons = socialSrc && nameIcons.map((name) => {
            let key = this.main.getId();
            return <a className={`social-icon ${name}-icon`} key={key} href={socialSrc[name]}> </a>
        });
        return icons;
    }

    changeProfile(fullName) {
        this.profileData = this.main.userList.userList.find((item) => item.fullName === fullName);
        if (!this.profileData) {
            this.profileData = this.main.user.userData[0];
        }
    }
}

export default ProfileData;