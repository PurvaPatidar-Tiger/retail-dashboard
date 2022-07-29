const signUpForm = document.getElementById("form1");

const base_url = 'http://127.0.0.1:5000';

const register = async () => {
    const requestData = {
        method: "POST",
        mode: 'cors',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstname: signUpForm.firstname.value,
            lastname: signUpForm.lastname.value,
            username: signUpForm.username.value,
            password: signUpForm.password.value,
        })
    }

    const response = await fetch(base_url + '/register', requestData);
    const data = await response.json();
    alert(data.message);
    console.log(data);
}

signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    register();
    window.open('login.html', '_parent');
});