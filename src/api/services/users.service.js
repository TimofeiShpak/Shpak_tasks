const funcApi = api => {
    api.friends = {
        getFriends() {
            return api.request.get('http://localhost:3001/userList');
        },
    }
}

export default funcApi;