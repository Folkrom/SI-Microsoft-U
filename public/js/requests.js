const httpService = new HttpService();

const login = async (username, password) => {
    try {
        const data = { username, password };
        const response = await httpService.post('/api/auth/login', data);

        return response;
    } catch (error) {
        console.info(error);
        return error;
    }
};

const getUsers = async () => {
    try {
        const response = await httpService.get('/api/users/');

        return response;
    } catch (error) {
        console.info(error);
        return error;
    }
};
