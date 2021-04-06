const funcApi = api => {
    api.profileData = {
        getProfileData(id) {
            return api.request.get(`http://localhost:3001/userList/${id}`);
        },
        changeProfileData(data, id) {
            return api.request.put(`http://localhost:3001/userList/${id}`, data);
        },
        addProfileData(data) {
            return api.request.post('http://localhost:3001/userList/', data);
        },
        deleteProfileData(id) {
            return api.request.delete(`http://localhost:3001/userList/${id}`);
        }
    }
}

export default funcApi;