function FormItem(props) {
    let { option, classNameLabel, isRequired } = props;

    return (
        <div className="form__item">
            <label className={classNameLabel} htmlFor={option}>{option}: </label>
            <input type="text" id={option} name={option} required={isRequired} />
        </div>
    )
}

export default FormItem;