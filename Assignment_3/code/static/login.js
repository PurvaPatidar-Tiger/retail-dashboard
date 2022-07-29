const signInForm = document.getElementById("form2");
const base_url = 'http://127.0.0.1:5000';



const login = async () => {
    const requestData = {
        method: "POST",
        mode: 'cors',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: signInForm.username.value,
            password: signInForm.password.value,
        })
    }

    const response = await fetch(base_url + '/login', requestData);
    const data = await response.json();
    if (response.status !== 200) {
        alert(data.message);
        signInForm.reset();
        return null;
    }
    return data;
}

signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login().then(x => {
        if (x) {
            localStorage.setItem('access_token', x.token);
            window.open('index.html', '_parent');
        }
    });
});