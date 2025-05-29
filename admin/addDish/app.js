
let isLogin = JSON.parse(localStorage.getItem("login")) || false;

if (!isLogin) {
    window.location = '../login/';
}

let notyf = new Notyf();

let restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];

console.log(restaurants);

let restaurantSelect = document.querySelector('#restaurantSelect');

for(let key in restaurants) {
    let res = restaurants[key];
    restaurantSelect.innerHTML += `<option value="${res.id}">${res.name}</option>`;
}

const saveData = (restaurants) => {
    localStorage.setItem("restaurants", JSON.stringify(restaurants));
}

const saveDish = (ID, dish) => {
    for(let key in restaurants) {
        let res = restaurants[key];
        if (res.id === +ID) {
            res.dishes.push(dish);
        }
    }
    console.log(restaurants);
    saveData(restaurants);
}

const addDish = () => {
    event.preventDefault();
    const name = document.querySelector('#dishName').value;
    const desc = document.querySelector('#dishDescription').value;
    const price = document.querySelector('#dishPrice').value;
    const dishImg = document.querySelector('#dishImage').files[0];
    console.log("inside");
    console.log(typeof price);
    if (name.trim() == "") {
        notyf.error("Please enter dish name");
        return;
    }
    if (desc.trim() == "") {
        notyf.error("Please enter dish description");
        return;
    }
    if (price.trim() == "" || price == "0") {
        notyf.error("Please enter dish price");
        return;
    }
    if (restaurantSelect.value == 0) {
        notyf.error("Please select restaurant to add dish");
        return;
    }
    if (!dishImg) {
        notyf.error("Please choose dish image");
        return;
    }
    if (dishImg) {
        const reader = new FileReader();
        reader.readAsDataURL(dishImg);
        reader.onload = function(e) {
            const image = e.target.result;
            const dish = new Dish(name, desc, price, image);
            notyf.success("Dish has been added.");
            saveDish(restaurantSelect.value, dish);
        }
    }
}

function Dish(name, desc, price, image) {
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.image = image;
    this.id = Date.now();
}

const addDishButton = document.querySelector('#addDishBtn');

addDishButton.addEventListener('click', addDish);

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
