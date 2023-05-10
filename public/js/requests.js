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
        const users = await httpService.get('/api/users/');

        return users;
    } catch (error) {
        console.info(error);
        return error;
    }
};

const getRoles = async () => {
    try {
        const roles = await httpService.get('/api/roles');

        return roles;
    } catch (error) {
        console.info(error);
        return error;
    }
};

const register = async (username, password, role) => {
    const data = { username, password, role };
    try {
        const response = await httpService.post('/api/auth/register', data);

        return response;
    } catch (error) {
        console.info(error);
        return error;
    }
};
