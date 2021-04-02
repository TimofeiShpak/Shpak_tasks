const funcApi = api => {
    api.messages = {
        getMessages(name) {
            return api.request.get(`http://localhost:3001/messages-${name}`);
        },
        addMessages(name, data) {
            return api.request.post(`http://localhost:3001/messages-${name}`, data);
        }
    }
}

export default funcApi;