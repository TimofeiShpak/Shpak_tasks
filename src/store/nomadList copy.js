import { makeAutoObservable } from "mobx";

const list = [{src:'', text:'All treads', id:'AllTreads', src:'../assets/icons/all-treads.svg'}];

class NomadList {
    constructor() {
        makeAutoObservable(this);
    }

    get list() {
        return list;
    }
}

export default new NomadList();