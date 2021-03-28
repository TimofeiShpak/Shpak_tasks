import DailyMessages from './DailyMessages';

function AllMessages(props) {
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
                {getListElements(props.messages)}
            </div>
        </div>
    );
}

export default AllMessages;