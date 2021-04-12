import { observer } from 'mobx-react';

import store from '../../mobx-multi/store';
import ItemInfo from './ItemInfo';

const ExtraInfo = observer(() => {
    let extraInfoData = store.profileData.getExtraInfoData();
    let extraInfoElements = extraInfoData.map((data) => {
        return <ItemInfo key={data.key} {...data} />
    });

    return (
      <div className="extra-info">
          {extraInfoElements}
      </div>
    )
})

export default ExtraInfo;