import { makeAutoObservable } from "mobx";

const friendList = [
    {status: 'online', text: 'Orlando Diggs', id: 'Orlando Diggs', src: './Shape1.svg'},
    {status: 'online', text: 'Carmen Velasco', id: 'Carmen Velasco', src: './Shape2.svg'},
    {status: 'offline', text: 'Marie Jensen', id: 'Marie Jensen', src: './Shape3.svg'},
    {status: 'offline', text: 'Alex Lee', id: 'Alex Lee', src: './Shape4.svg'},
    {status: 'offline', text: 'Leo Gill', id: 'Leo Gill', src: './Shape5.svg'},
    {status: 'offline', text: 'Britney Cooper', id: 'Britney Cooper', src: './Shape6.svg'},
    {status: 'offline', text: 'Jeshua Stout', id: 'Jeshua Stout', src: './Shape7.svg'},
    {status: 'offline', text: 'Harold Adams', id: 'Harold Adams', src: './Shape8.svg'},
    {status: 'offline', text: 'Aada Laine', id: 'Aada Laine', src: './Shape9.svg'},
    {status: 'offline', text: 'Nala Hester', id: 'Nala Hester', src: './Shape10.svg'},
    {status: 'offline', text: 'Ramon Bateman', id: 'Ramon Bateman', src: './Shape11.svg'},
]

class FriendList {
    constructor() {
        makeAutoObservable(this);
    }

    get list() {
        return friendList;
    }
}

export default new FriendList();