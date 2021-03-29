import { makeAutoObservable } from "mobx";

const profileData = {
    status: 'online',
    imgSrc : './user-avatar.png',
    fullName : 'Amilia Luna',
    specialty : 'UI Designer',
    socialSrc : {
      facebook : '',
      instagram : '',
      twitter : '',
      linkedin : '',
    },
    extraInfo: {
      userName : '@amilia_lu',
      Email : 'a-luna@gmail.com',
      Skype : 'amiluna', 
      Timezone : '2:21 PM Local time'
    }
  }

class ProfileData {
    constructor() {
        makeAutoObservable(this);
    }

    get data() {
        return profileData;
    }
}

export default new ProfileData();