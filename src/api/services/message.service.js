const funcApi = api => {
    api.messages = {
        getMessages(name) {
            return api.request.get(`/messages-${name}`);
        },
        addMessages(name, data) {
            return api.request.post(`/messages-${name}`, data);
        },
        updateMessage(name, data, id) {
            return api.request.put(`/messages-${name}/${id}`, data);
        },
        deleteMessage(name, id) {
            return api.request.delete(`/messages-${name}/${id}`);
        }
    }
}

export default funcApi;