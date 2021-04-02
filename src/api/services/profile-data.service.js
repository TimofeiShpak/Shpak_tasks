const funcApi = api => {
    api.profileData = {
        getProfileData() {
            return api.request.get('http://localhost:3001/profileData');
        },
    }
}

export default funcApi;