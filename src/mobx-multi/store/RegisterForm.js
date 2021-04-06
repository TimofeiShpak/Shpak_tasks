import classNames from "classnames";
import { makeAutoObservable } from "mobx";
import api from "../../api/api";

import FormItem from '../../components/authorization/FormItem';

const mainOptions = ['userName', 'fullName', 'specialty','twitter', 'instagram', 
    'facebook', 'linkedin', 'Email', 'Skype'];
const requiredOptions = ['userName', 'fullName'];

class RegisterForm {
    isWrong = false;

    constructor(main) {
        makeAutoObservable(this)
        this.main = main;
    }

    updateDataApp(data) {
        let fullName = data.fullName;
        let id = this.main.getId();
        data.id = id;
        api.profileData.addProfileData(data);
        this.main.userList.userList.push(data);
        this.main.user.checkFullName(fullName);
        document.cookie = `fullName=${fullName}`;
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
        data.src = './anonim.jpg';
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