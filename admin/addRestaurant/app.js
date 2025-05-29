
let isLogin = JSON.parse(localStorage.getItem("login")) || false;

console.log(isLogin);

if (!isLogin) {
    window.location = '../login/';
}

let notyf = new Notyf();

let restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];

const isRestaurantFound = (name) => {
    return restaurants.find((restaurant) => {
        return restaurant.name.toLowerCase() === name.toLowerCase();
    });
}

const addRestaurant = (event) => {
    event.preventDefault();
    const name = document.querySelector('#restaurantName').value;
    const desc = document.querySelector('#description').value;
    const location = document.querySelector('#location').value;
    const contactNumber = document.querySelector('#contactNumber').value;
    const rating = document.querySelector('#ratingSelect').value;
    const img = document.querySelector('#restaurantImage').files[0];
    const isdelivery = document.querySelector('#deliveryAvailable').checked;
    if (isRestaurantFound(name)) {
        notyf.error(`${name} restaurant is already existed`);
        return;
    }
    if (name.trim() == "") {
        notyf.error("Please enter restaurant name");
        return;
    }
    if (desc.trim() == "") {
        notyf.error("Please enter restaurant description");
        return;
    }
    if (location.trim() == "") {
        notyf.error("Please enter restaurant location");
        return;
    }
    if (contactNumber.trim() == "") {
        notyf.error("Please enter restaurant contact number");
        return;
    }
    if (rating == 0) {
        notyf.error("Please select restaurant rating");
        return;
    }
    if (!img) {
        notyf.error("Please choose restaurant image");
        return;
    }
    if (img) {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function(e) {
            const imgURL = e.target.result;
            notyf.success("Restaurant has been added");
            const restaurant = new Restaurant(name, desc, location, contactNumber, rating, imgURL, isdelivery);
            restaurants.push(restaurant);
            setTimeout(() => {
                window.location = '../addDish/index.html';
            }, 1000);
            saveRestaurant(restaurants);
        }
    }
}

function Restaurant(name, desc, location, contactNumber, rating, img, isdelivery) {
    this.id = Date.now();
    this.name = name;
    this.desc = desc;
    this.location = location;
    this.contactNumber = contactNumber;
    this.rating = rating;
    this.img = img;
    this.isdelivery = isdelivery;
    this.dishes = [];
}

const addRestaurantForm = document.querySelector('#addRestaurantForm');

addRestaurantForm.addEventListener('submit', addRestaurant);

const saveRestaurant = (restaurant) => {
    localStorage.setItem("restaurants", JSON.stringify(restaurant));
}

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
