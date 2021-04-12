const funcApi = api => {
    api.profileData = {
        getProfileData(id) {
            return api.request.get(`/userList/${id}`);
        },
        changeProfileData(data, id) {
            return api.request.put(`/userList/${id}`, data);
        },
        addProfileData(data) {
            return api.request.post('/userList/', data);
        },
        deleteProfileData(id) {
            return api.request.delete(`/userList/${id}`);
        }
    }
}

export default funcApi;