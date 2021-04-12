const funcApi = api => {
    api.users = {
        getUsers() {
            return api.request.get('/userList');
        }
    }
}

export default funcApi;