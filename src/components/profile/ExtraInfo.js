import ItemInfo from './ItemInfo';

function ExtraInfo(props) {
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
            {getExtraInfo(props.data)}
        </div>
    )
}

export default ExtraInfo;