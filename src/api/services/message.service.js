const funcApi = api => {
    api.messages = {
        getMessages(name) {
            return api.request.get(`${api.path}/messages-${name}`);
        },
        addMessages(name, data) {
            return api.request.post(`${api.path}/messages-${name}`, data);
        },
        updateMessage(name, data, id) {
            return api.request.put(`${api.path}/messages-${name}/${id}`, data);
        },
        deleteMessage(name, id) {
            return api.request.delete(`${api.path}/messages-${name}/${id}`);
        }
    }
}

export default funcApi;