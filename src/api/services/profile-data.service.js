const funcApi = api => {
    api.profileData = {
        getProfileData(index) {
            return api.request.get(`http://localhost:3001/userList/${index}`);
        },
        changeProfileData(data) {
            return api.request.put('http://localhost:3001/userList/1', data);
        }
    }
}

export default funcApi;