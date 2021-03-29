import { observer } from 'mobx-react';

import ItemInfo from './ItemInfo';
import profileData from '../../store/profileData';

const ExtraInfo = observer(() => {
    function getExtraInfo(data) {
        let itemsInfo = [];
        for (let dataElem in data) {
            let elem = <ItemInfo key={dataElem} type={dataElem} value={data[dataElem]}/>
            itemsInfo.push(elem);
        }
        return itemsInfo;
    }
    return (
        <div className="extra-info">
            {getExtraInfo(profileData.data.extraInfo)}
        </div>
    )
});

export default ExtraInfo;