import { makeAutoObservable, runInAction } from "mobx";

import api from '../../api/api';
import ItemInfo from '../../components/profile/ItemInfo';

const nameIcons = ['facebook', 'instagram', 'linkedin', 'twitter'];

class ProfileData {
    profileData = {};
    constructor(main) {
        makeAutoObservable(this);
        this.main = main

        api.profileData.getProfileData()
            .then((data) => {
                runInAction(() => this.profileData = data);
            });

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
        let classNameTitle = "profile__title ";
        classNameTitle += status === 'online' ? 'online' : '';
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
}

export default ProfileData;