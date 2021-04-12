import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';

const SocialLinks = observer(() => {
    let socialLinksData = store.profileData.getSocialLinksData();
    let socialLinksElements = socialLinksData.map((data) => {
        return  (
            <a 
                className={`social-icon ${data.name}-icon`} 
                href={data.href} 
                target="_blank"
                rel="noreferrer"> 
            </a>
        );
    });

    return (
      <ul className="social-icons">
          {socialLinksElements}
      </ul>
    )
})

export default SocialLinks;