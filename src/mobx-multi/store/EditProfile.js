import { makeAutoObservable } from "mobx";
import api from "../../api/api";

import LabelItem from '../../components/profile/LabelItem';

const options = ['userName', 'fullName', 'specialty','twitter', 'instagram', 
    'facebook', 'linkedin', 'Email', 'Skype'];
const requiredOptions = ['userName', 'fullName'];
const initValues = { 'userName' : '', 'fullName' : '', 'specialty' : '', 'twitter' : '',
    'instagram' : '', 'facebook' : '', 'linkedin' : '', 'Email' : '', 'Skype' : '' }

class EditProfile {
    values = initValues;

    constructor(main) {
        makeAutoObservable(this);
        this.main = main;
    }

    initValues() {
        let userData = this.main.user.userData[0];
        options.forEach((option) => this.values[option] = userData[option]);
    }

    getInput(option) {
        let isRequired = requiredOptions.includes(option);
        let value = this.values[option];
        let func = (event) => this.onInput(event, option);
        return (
            <input 
                key={option}
                type="text" 
                name={option} 
                onChange={func}
                value={value}
                required={isRequired}
            />
        );
    }

    onInput(event, option) {
        this.input = event.target;
        this.values[option] = event.target.value;
    }

    getElements() {
        return options.map((option) => this.getInput(option));
    }

    getLabelList() {
        let list = options.map((option) => {
            let id = this.main.getId();
            return (
                <LabelItem key={id} option={option} />
            )
        });
        return list;
    }

    saveProfile(event) {
        event.preventDefault();
        let userData = this.main.user.userData[0];
        let id = userData.id;
        api.profileData.changeProfileData(this.values, id);
        this.main.user.userData[0] = {...userData, ...this.values };
        this.main.profileData.changeProfile(this.values.userName);
        this.main.user.channelPath = '/' + this.main.channelData.getName();
    }
}

export default EditProfile;