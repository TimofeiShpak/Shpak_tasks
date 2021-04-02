const funcApi = api => {
    api.channels = {
        getChannels() {
            return api.request.get('http://localhost:3001/channelList');
        },
    }
}

export default funcApi;