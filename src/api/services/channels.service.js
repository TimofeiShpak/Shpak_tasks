const funcApi = api => {
    api.channels = {
        getChannels() {
            return api.request.get('/channelList');
        },
    }
}

export default funcApi;