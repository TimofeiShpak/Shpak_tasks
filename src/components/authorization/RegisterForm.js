import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';
import FormItem from './FormItem';

const RegisterForm = observer(() => {
    let registerUser = (event) => store.registerForm.registerUser(event);
    let isWrong = store.registerForm.isWrong;
    let formListData = store.registerForm.getFormListData();
    let formListElements = formListData.map((data) => {
        return <FormItem key={data.key} {...data} />
    });

    return (
        <div className="form-wrapper">
            <form className="form" onSubmit={registerUser}>
                <fieldset>
                    <legend>Registration form:</legend>
                    { isWrong && (
                            <div className="form__wrong">userName is busy, write another</div>
                        )
                    }
                    {formListElements}
                    <input className="btn-submit" type="submit" value="sign up" />
                </fieldset>
            </form>
        </div>
    )
})

export default RegisterForm;