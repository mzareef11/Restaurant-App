
console.log("Hello World!");

let notyf = new Notyf();

const loginForm = document.querySelector('#loginForm');
let email = document.querySelector('#email');
let password = document.querySelector('#password');

let login = JSON.parse(localStorage.getItem("login")) || [];

console.log(login);

if (login == true) {
    window.location = '../admin.html';
}

const adminEmail = '12345';
const adminPassword = '12345';

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (email.value === adminEmail) {
        if (password.value === adminPassword) {
            notyf.success("Login successful.");
            setTimeout(() => {
                window.location = '../admin.html';
            }, 1000);
            localStorage.setItem("login", true);
        } else {
            notyf.error("Invalid email or password.");
        }
    } else {
        notyf.error("Please enter a valid email address.");
    }
});
