import { makeAutoObservable } from "mobx";

const channelList = [
    {text: 'general', id: 'general',  numberSubscribers : 1093}, 
    {text: 'support', id: 'support', numberSubscribers : 921}, 
    {text: 'marketing', id: 'marketing', numberSubscribers : 789}, 
    {text: 'thailand', id: 'thailand', numberSubscribers : 434},
    {text: 'bali', id: 'bali', numberSubscribers : 524}, 
    {text: 'poland', id: 'poland', numberSubscribers : 675},
    {text: 'australia', id: 'australia', numberSubscribers : 875}, 
    {text: 'jobs', id: 'jobs', numberSubscribers : 890}, 
    {text: 'startups', id: 'startups', numberSubscribers : 345}, 
    {text: 'italy', id: 'italy', numberSubscribers : 524},
    {text: 'freelance', id: 'freelance', numberSubscribers : 678}
]

class ChannelList {
    constructor() {
        makeAutoObservable(this);
    }

    get list() {
        return channelList;
    }
}

export default new ChannelList();