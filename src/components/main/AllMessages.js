import { observer } from 'mobx-react';

import DailyMessages from './DailyMessages';
import messageList from '../../store/messageList';

const AllMessages = observer(() => {
    function getListElements(data) {
        let list = [];
        for (let dataElem in data) {
            let elem = <DailyMessages 
                            key={dataElem} 
                            date = {dataElem} 
                            messagesData = {data[dataElem]} 
                        />
            list.push(elem);
        }
        return list;
    }

    return (
        <div className="all-messages-wrapper">
            <div className="all-messages">
                {getListElements(messageList.list)}
            </div>
        </div>
    );
})

export default AllMessages;