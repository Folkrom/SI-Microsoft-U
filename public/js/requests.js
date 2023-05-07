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
        console.log("🚀 ~ file: requests.js:12 ~ login ~ response:", response)
        
        return response;
    } catch (error) {
        console.info(error);
        return error;
    }
};

