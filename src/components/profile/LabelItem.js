function LabelItem(props) {
    let { option } = props;

    return (
        <label htmlFor={option}>{option}: </label>
    );
};

export default LabelItem;