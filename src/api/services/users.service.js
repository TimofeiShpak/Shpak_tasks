const funcApi = api => {
    api.users = {
        getUsers() {
            return api.request.get(`${api.path}/userList`);
        }
    }
}

export default funcApi;