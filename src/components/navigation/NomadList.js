import { observer } from 'mobx-react';

import ListItem from './ListItem';
import nomadList from '../../store/nomadList';

const NomadList = observer(() => {
    const listElements = nomadList.list.map((item) => {
        return <ListItem 
                    key={item.id} 
                    src={item.src} 
                    text={item.text} 
                />
    });
    return (
        <div className="nomad-wrapper">
            <div className="nomad-list">
                <button className="nomad-btn list-open">
                    <div>
                        Nomad List
                    </div>
                    <span></span>
                </button>
                <ul>
                    {listElements}
                </ul>
            </div>
            <button className="settings"></button>
        </div>
    )
})

export default NomadList;