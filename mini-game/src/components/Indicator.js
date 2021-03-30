function IndicatorElement(props) {
    return (
        <div className="indicator">
            <div className="indicator__name">{props.title}</div>
            <div className="progress-bar">
                <div 
                    className={`progress progress_${props.name}`} 
                    style={{width:`${props.option}%`}}>
                </div>
            </div>
        </div>
    )
}

export default IndicatorElement;