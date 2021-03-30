import IndicatorElement from './Indicator';

function IndicatorList(props) {
    const indicatorsName = ['health', 'thirst', 'hunger', 'tiredness'];
    const indicatorsTitles = ['Здоровье','Жажда','Голод','Усталость'];
    let elements = indicatorsName.map((name, index) => {
        return <IndicatorElement 
                    name={name} 
                    title ={indicatorsTitles[index]} 
                    key={name}
                    option={props.options[name]}
                />
    });

    return (
        <div className="indicators">
            {elements}
        </div>
    )
}

export default IndicatorList;