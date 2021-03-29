import { observer } from 'mobx-react';

import profileData from '../../store/profileData';

const nameIcons = ['facebook', 'instagram', 'linkedin', 'twitter'];

const SocialIcons = observer(() => {
    let icons = nameIcons.map((name) => {
        return <a className={`social-icon ${name}-icon`} key={name} href={profileData.data.socialSrc[name]}></a>
    });
    return (
        <ul className="social-icons">
            {icons}
        </ul>
    )
})

export default SocialIcons;