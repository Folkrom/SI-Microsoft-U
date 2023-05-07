const login = async (username, password) => {
    try {
        const rawResponse = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const response = await rawResponse.json();

        return response;
    } catch (error) {
        console.info(error);
        return error;
    }
};

const hasToken = async () => {
    const token = localStorage.getItem('token');

    if (token === null) {
        return (window.location.href = '/');
    }

    try {
        // const httpService = new HttpService({ 'x-token': token });
        // const response = await httpService.get('/api/users/');
        // console.log(response);
        // const rawResponse = await fetch('/dashboard', {
        //   method: 'GET',
        //   headers: {
        //     Accept: '*/*',
        //     'x-token': token,
        //   },
        // });
        // const response = await rawResponse;
        
        console.log(response);
    } catch (error) {
        console.info(error);
    }
};
