const funcApi = api => {
    api.channels = {
        getChannels() {
            return api.request.get(`${api.path}/channelList`);
        },
    }
}

export default funcApi;