const funcApi = api => {
    api.users = {
        getUsers() {
            return api.request.get('http://localhost:3001/userList');
        }
    }
}

export default funcApi;