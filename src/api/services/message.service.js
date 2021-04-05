const funcApi = api => {
    api.messages = {
        getMessages(name) {
            return api.request.get(`http://localhost:3001/messages-${name}`);
        },
        addMessages(name, data) {
            return api.request.post(`http://localhost:3001/messages-${name}`, data);
        },
        updateMessage(name, data, id) {
            return api.request.put(`http://localhost:3001/messages-${name}/${id}`, data);
        },
        deleteMessage(name, id) {
            return api.request.delete(`http://localhost:3001/messages-${name}/${id}`);
        }
    }
}

export default funcApi;