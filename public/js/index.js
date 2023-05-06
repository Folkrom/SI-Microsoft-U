
const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

const handleSubmit = async(event) => {
    event.preventDefault(); 

    const username = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    const validLogin = await login(username, password);

    if (validLogin.msg) {
        document.getElementById('login-err').innerHTML = validLogin.msg;
        return
    }

    const { token, role } = validLogin;

    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    window.location.href = '/dashboard';



    
}


