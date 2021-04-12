const funcApi = api => {
    api.profileData = {
        getProfileData(id) {
            return api.request.get(`${api.path}/userList/${id}`);
        },
        changeProfileData(data, id) {
            return api.request.put(`${api.path}/userList/${id}`, data);
        },
        addProfileData(data) {
            return api.request.post(`${api.path}/userList/`, data);
        },
        deleteProfileData(id) {
            return api.request.delete(`${api.path}/userList/${id}`);
        }
    }
}

export default funcApi;