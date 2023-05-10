const handleSubmit = async (event) => {
    event.preventDefault();

    const username = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!regex.test(password)) {
        document.getElementById('login-err').innerHTML =
            'Usuario/Password no son correctos';
        return;
    }

    const validLogin = await login(username, password);

    if (validLogin.msg) {
        document.getElementById('login-err').innerHTML =
            'Usuario/Password no son correctos';
        return;
    }

    const { username: user, role } = validLogin;

    sessionStorage.setItem('username', user);
    sessionStorage.setItem('role', role);

    window.location.href = '/dashboard';
};
