
console.log("Hello World!");

let isLogin = JSON.parse(localStorage.getItem("login")) || false;

console.log(isLogin);

if (!isLogin) {
    window.location = '../login/';
}

let notyf = new Notyf();










const logoutButton = document.querySelector('#logout-btn');

const logout = (event) => {
    event.preventDefault();
    localStorage.setItem("login", false);
    notyf.success("Logout successful.");
    setTimeout(() => {
        location = '../login/';
    }, 1000);
}

logoutButton.addEventListener('click', logout);
