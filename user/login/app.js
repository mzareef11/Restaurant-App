
let notyf = new Notyf();

const users = JSON.parse(localStorage.getItem("users")) || [];

const verifyEmail = (email) => {
    return users.find((user) => {
        return user.email.toLowerCase() === email.toLowerCase();
    });
}

const loginHandler = (event) => {
    event.preventDefault();
    const email = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;
    if (email.trim() == "" || password.trim() == "") {
        notyf.error("Please enter your email and password.");
        return;
    }
    const user = verifyEmail(email);
    if (!user) {
        notyf.error("User not found.");
        return;
    }
    if (password !== user.password) {
        notyf.error("Password is not matched.");
        return;
    }
    notyf.success("Login  Succesfull.");
    localStorage.setItem("currentUser", JSON.stringify(user));
    setTimeout(() => {
        location = `/`;
    }, 1000);
}

const signinButton = document.querySelector('#signinButton');

signinButton.addEventListener('click', loginHandler);

const passwordElement = document.querySelector('#passwordElement');

const showPassword = () => {
    let input = passwordElement.childNodes[1];
    let icon = passwordElement.childNodes[7].children[0];
    if (input.type == "password") {
        input.type = "text";
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = "password";
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

passwordElement.childNodes[7].addEventListener('click', showPassword);
