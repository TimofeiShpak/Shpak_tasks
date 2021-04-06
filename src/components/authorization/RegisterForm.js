import { observer } from 'mobx-react';

import store from "../../mobx-multi/store";

const RegisterForm = observer(() => {
    let registerUser = (event) => store.registerForm.registerUser(event);
    let isWrong = store.registerForm.isWrong;

    return (
        <div className="form-wrapper">
            <form className="form" onSubmit={registerUser}>
                <fieldset>
                    <legend>Registration form:</legend>
                    { isWrong && (
                            <div className="form__wrong">userName is busy, write another</div>
                        )
                    }
                    {store.registerForm.getFormList()}
                    <input className="btn-submit" type="submit" value="sign up" />
                </fieldset>
            </form>
        </div>
    )
})

export default RegisterForm;