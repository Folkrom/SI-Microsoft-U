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

const registerUser = async (username, password, role) => {
    const data = { username, password, role };
    try {
        const response = await httpService.post('/api/auth/register', data);

        return response;
    } catch (error) {
        console.info(error);
        return error;
    }
};

const registerRole = async (role) => {
    const data = { role };
    try {
        const response = await httpService.post('/api/roles/create', data);

        return response;
    } catch (error) {
        console.info(error);
        return error;
    }
};

const deleteRole = async (role) => {
    try {
        const response = await httpService.delete(`api/roles/${role}`);

        return response;
    } catch (error) {
        console.info(error);
        return error;
    }
};

const editRole = async (role, newRole) => {
    const data = { newRole };

    try {
        const response = await httpService.put(`/api/roles/${role}`, data);

        return response;
    } catch (error) {
        console.info(error);
        return error;
    }
};

const deleteUser = async (id) => {
    try {
        const response = await httpService.delete(`api/users/${id}`);

        return response;
    } catch (error) {
        console.info(error);
        return error;
    }
};

const editUser = async (id, newPassword, newUsername, newRole) => {
    const data = { password: newPassword, roleName: newRole, newUsername };

    try {
        const response = await httpService.put(`/api/users/${id}`, data);

        return response;
    } catch (error) {
        console.info(error);
        return error;
    }
};

const getInfoFromEndpoint = async (endpoint) => {
    try {
        const response = await httpService.get(`/api/info/${endpoint}`);

        return response;
    } catch (error) {
        console.info(error);
        return error;
    }
};

const registerData = async (endpoint, formData) => {
    try {
        const response = await httpService.post(
            `/api/info/${endpoint}`,
            formData
        );

        return response;
    } catch (error) {
        console.info(error);
        return error;
    }
};
