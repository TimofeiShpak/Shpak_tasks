import classNames from "classnames";
import { makeAutoObservable } from "mobx";
import api from "../../api/api";

import FormItem from '../../components/authorization/FormItem';

const mainOptions = ['userName', 'fullName', 'specialty','twitter', 'instagram', 
    'facebook', 'linkedin', 'Email', 'Skype'];
const requiredOptions = ['userName', 'fullName'];

const SRC_ANONIM = './anonim.jpg';

class RegisterForm {
    isWrong = false;

    constructor(main) {
        makeAutoObservable(this)
        this.main = main;
    }

    updateDataApp(data) {
        let userName = data.userName;
        let id = this.main.getId();
        data.id = id;
        api.profileData.addProfileData(data);
        this.main.userList.users.push(data);
        this.main.user.checkUserName(userName);
        this.main.channelData.path = '/' + this.main.channelData.getName(); 
        this.main.profileData.changeProfile(id);
        document.cookie = `userName=${userName}`;
    }

    checkData(data) {
        let userName = data.userName;
        let isValid = this.main.userList.userNames.filter((user) => user === userName).length;
        if (!isValid) {
            this.isWrong = false;
            this.updateDataApp(data);
        } else {
            this.isWrong = true;
        }
    }

    registerUser(event) {
        event.preventDefault();
        let elem = event.target;
        let data = {};
        mainOptions.forEach((name) => {
            if (name === 'userName') {
                data[name] = '@' + elem.querySelector(`#${name}`).value;
            } else {
                data[name] = elem.querySelector(`#${name}`).value;
            }
        });
        data.src = SRC_ANONIM;
        data.status = "online";
        data.friends = {};
        data.friendRequests = {};
        this.checkData(data, elem);
    }

    getFormList() {
        let list = mainOptions.map((option) => {
            let isRequired = requiredOptions.includes(option);
            let classNameLabel = classNames({
                "required" : isRequired,
            });
            let key = this.main.getId();
            return (
                <FormItem 
                    option={option}
                    classNameLabel={classNameLabel} 
                    isRequired={isRequired}
                    key={key}
                />
            )
        });
        return list;
    }
}

export default RegisterForm;