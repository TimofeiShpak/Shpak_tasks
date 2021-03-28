const partPath = '../../assets/icons';
const nameIcons = ['facebook', 'instagram', 'linkedin', 'twitter'];

function SocialIcons(props) {
    let icons = nameIcons.map((name) => {
        return <a className={`social-icon ${name}-icon`} key={name}></a>
    });
    return (
        <ul className="social-icons">
            {icons}
        </ul>
    )
}

export default SocialIcons;