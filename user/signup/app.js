
let notyf = new Notyf();

const users = JSON.parse(localStorage.getItem("users")) || [];

const signupButton = document.querySelector("#signupButton");

const isValidPassword = (password) => {
    let isLowerCase = false;
    let isUpperCase = false;
    let isNumber = false;
    let isSpecial = false;
    for (let char of password) {
        if (char >= 'a' && char <= 'z') 
            isLowerCase = true;
        else if (char >= 'A' && char <= 'Z')
            isUpperCase = true;
        else if (char >= '0' && char <= '9')
            isNumber = true;
        else if ('!@#$%^&'.includes(char))
            isSpecial = true;
    }
    if (isLowerCase && isUpperCase && isNumber && isSpecial)
        return true;
}

const verifyEmail = (email) => {
    return users.find((user) => {
        return user.email.toLowerCase() === email.toLowerCase();
    });
}

const signupHandler = (event) => {
    event.preventDefault();
    const fullName = document.querySelector('#fullName').value;
    const email = document.querySelector('#signupEmail').value;
    const password = document.querySelector('#signupPassword').value;
    let isFound = verifyEmail(email);
    if (isFound) {
        notyf.error("User has already been registered.");
        return;
    }
    if (!isValidPassword(password)) {
        notyf.error("Password should be included numbers & special chars.");
        return;
    }
    users.push({fullName, email, password});
    localStorage.setItem("users", JSON.stringify(users));
    notyf.success("signup successful.");
    setTimeout(() => {
        location = "../login";
    }, 600);
}

signupButton.addEventListener('click', signupHandler);

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
