
let notyf = new Notyf();

let isLogin = JSON.parse(localStorage.getItem("login")) || false;

if (!isLogin) {
    window.location = './login/';
}

document.getElementById('sidebarToggle').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('main-content').classList.toggle('active');
});

let restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];

let o = {
    name: "biryani"
}

let ord = [];

ord.push(o);

console.log(ord);

localStorage.setItem("orders", JSON.stringify(ord));

let orders = JSON.parse(localStorage.getItem("orders")) || [];

console.log(orders.length);

let dishCount = 0;

for (let i = 0; i < restaurants.length; i++) {
    dishCount += restaurants[i].dishes.length;
}

const totalRes = document.querySelector('#totalRestaurants');
const totalDishes = document.querySelector('#totalDishes');
const totalOrders = document.querySelector('#totalOrders');

totalRes.innerHTML = restaurants.length;
totalDishes.innerHTML = dishCount;
totalOrders.innerHTML = orders.length;

const table = document.querySelector('#tableBody');

const displayRestaurants = () => {
    table.innerHTML = "";
    for(let key in restaurants) {
        let res = restaurants[key];
        table.innerHTML += `
        <tr>
            <td>${+key+1}</td>
            <td>
                <div class="d-flex align-items-center">
                    <strong>${res.name}</strong>
                </div>
            </td>
            <td>${res.desc}</td>
            <td>
                <span class="badge bg-warning text-dark">
                    <i class="fas fa-star"></i> ${res.rating}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-custom" onclick="displayDishes(${res.id})">
                    <i class="fas fa-eye me-1"></i> View Dishes
                </button>
            </td>
            <td>
                <i class="fas fa-edit edit-btn action-btn" id="myButton" onclick="openRestaurantEditModal(${res.id})" title="Edit"></i>
                <i class="fas fa-trash delete-btn action-btn" title="Delete" onclick="deleteRestaurant(${key})"></i>
            </td>
        </tr>
        `;
    }
}

displayRestaurants();

const restaurantEditForm = document.querySelector("#editRestaurantForm");

let restaurant;

function openRestaurantEditModal(id) {
    var myModal = new bootstrap.Modal(document.getElementById('editRestaurantModal'));
    myModal.show();
    restaurant = findRestaurantById(id);
    const name = restaurantEditForm.querySelector("#restaurantName");
    const desc = restaurantEditForm.querySelector("#restaurantDescription");
    const location = restaurantEditForm.querySelector("#restaurantLocation");
    const rating = restaurantEditForm.querySelector("#restaurantRating");
    const contactNo = restaurantEditForm.querySelector("#restaurantContact");
    const isDelivery = restaurantEditForm.querySelector("#deliveryAvailable");
    name.value = restaurant.name;
    desc.value = restaurant.desc;
    location.value = restaurant.location;
    rating.value = restaurant.rating;
    contactNo.value = restaurant.contactNumber;
    isDelivery.checked = restaurant.isDelivery || false;
}

const updateRestaurant = () => {
    const name = restaurantEditForm.querySelector("#restaurantName");
    const desc = restaurantEditForm.querySelector("#restaurantDescription");
    const location = restaurantEditForm.querySelector("#restaurantLocation");
    const rating = restaurantEditForm.querySelector("#restaurantRating");
    const contactNo = restaurantEditForm.querySelector("#restaurantContact");
    const isDelivery = restaurantEditForm.querySelector("#deliveryAvailable");
    let img = restaurantEditForm.querySelector("#restaurantImage");
    const restaurantIndex = restaurants.findIndex(res => res.id == restaurant.id);
    if (img.files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(img.files[0]);
        reader.onload = function (e) {
            img = e.target.result;
            const EditedRestaurant = new Restaurant(name.value, desc.value, location.value, restaurant.dishes, rating.value, contactNo.value, isDelivery, img, restaurant.id);
            restaurants[restaurantIndex] = EditedRestaurant;
            notyf.success("Restaurant has been updated.");
            saveRestaurants(restaurants);
        }
    } else {
        const EditedRestaurant = new Restaurant(name.value, desc.value, location.value, restaurant.dishes, rating.value, contactNo.value , isDelivery.checked, restaurant.img, restaurant.id);
        restaurants[restaurantIndex] = EditedRestaurant;
        notyf.success("Restaurant has been updated.");
        saveRestaurants(restaurants);
    }
    setTimeout(displayRestaurants, 500);
}

const deleteRestaurant = (k) => {
    let isConfirm = confirm('Are you sure you want to delete this restaurant?');
    if (isConfirm) {
        restaurants.splice(k, 1);
        displayRestaurants();
        notyf.success("Restaurant deleted");
        saveRestaurants(restaurants);
    } else {
        notyf.error("Cancel");
    }
}

function Restaurant(name, desc, location, dishes, rating, contactNumber, isdelivery, img, id) {
    this.name = name;
    this.desc = desc;
    this.location = location;
    this.contactNumber = contactNumber;
    this.rating = rating;
    this.img = img;
    this.id = id;
    this.isdelivery = isdelivery;
    this.dishes = dishes;
}

const findRestaurantById = (id) => {
    return restaurants.find((restaurant) => {
        return restaurant.id === id;
    });
}

const dishCard = document.querySelector('#dishCard');

const displayDishes = (id) => {
    restaurant = findRestaurantById(id);
    let dishes = restaurant.dishes;
    if (dishes.length == 0) {
        dishCard.innerHTML = `
        <div class="d-flex align-items-center justify-content-center col-lg-12">
            <strong>Dishes are not available.</strong>
        </div>
        `;
        return;
    }
    dishCard.innerHTML = `
    <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Dishes</h5>
                        <button class="btn btn-sm btn-custom" id="goToAddDishes" onclick="goToAddDishes()">
                            <i class="fas fa-plus me-1"></i> Add Dishes
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover" id="dishTableHead">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Dish Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Restaurant</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="dishTableBody">
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
    `;
    const dishTable = document.querySelector('#dishTableBody');
    dishTable.innerHTML = "";
    for (let key in dishes) {
        let dish = dishes[key];
        dishTable.innerHTML += `
        <tr>
            <td>${+key+1}</td>
            <td>
                <div class="d-flex align-items-center">
                    <strong>${dish.name}</strong>
                </div>
            </td>
            <td>${dish.desc}</td>
            <td>
                <span class="badge text-dark">${dish.price}</span>
            </td>
            <td>
                <span class="badge text-dark">${restaurant.name}</span>
            </td>
            <td>
                <i class="fas fa-edit edit-btn action-btn" onclick="openEditDishModal(${dish.id})" data-bs-toggle="modal" data-bs-target="#editDishModal" title="Edit"></i>
                <i class="fas fa-trash delete-btn action-btn" title="Delete" onclick="deleteDish(${dish.id})"></i>
            </td>
        </tr>
        `;
    }
}

const dishEditForm = document.querySelector("#editDishForm");
const name = dishEditForm.querySelector("#dishName");
const price = dishEditForm.querySelector("#dishPrice");
const desc = dishEditForm.querySelector("#dishDescription");
let imgInput = dishEditForm.querySelector("#dishImage");
let dishId;

const openEditDishModal = (id) => {
    dishId = id;
    const dishes = restaurant.dishes;
    let dish = dishes.find(dish => dish.id == dishId);
    name.value = dish.name;
    price.value = dish.price;
    desc.value = dish.desc;
}

const updateDish = (event) => {
    event.preventDefault();
    const dishes = restaurant.dishes;
    let dish = dishes.find(dish => dish.id == dishId);
    const findIdx = dishes.findIndex(dish => dish.id == dishId);
    if (imgInput.files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(imgInput.files[0]);
        reader.onload = function (e) {
            img = e.target.result;
            const newDish = new Dish(name.value, price.value, desc.value, img, dish.id);
            dishes[findIdx] = newDish;
        }
    } else {
        const newDish = new Dish(name.value, price.value, desc.value, dish.image, dish.id);
        dishes[findIdx] = newDish;
        notyf.success("Dish has been edited.");
        setTimeout(() => {
            displayDishes(restaurant.id);
        }, 500);
        saveRestaurants(restaurants);
    }
}

const deleteDish = (id) => {
    const dishes = restaurant.dishes;
    const findIdx = dishes.findIndex(dish => dish.id == id);
    dishes.splice(findIdx, 1);
    displayDishes(restaurant.id);
    notyf.success("Dish has been deleted.");
    saveRestaurants(restaurants);
}

function Dish(name, price, desc, img, id) {
    this.name = name;
    this.price = price;
    this.desc = desc;
    this.image = img;
    this.id = id;
}

dishEditForm.addEventListener('submit', updateDish);

const saveRestaurants = (restaurants) => {
    localStorage.setItem("restaurants", JSON.stringify(restaurants));
}

const logout = (event) => {
    event.preventDefault();
    localStorage.setItem("login", false);
    notyf.success("Logout successful.");
    setTimeout(() => {
        location = './login/';
    }, 1000);
}

const logoutButton = document.querySelector('#logout-btn');

logoutButton.addEventListener('click', logout);

const addRestaurantBtn = document.querySelector('#goToAddRestaurant');

const changeLocation = () => {
    window.location = './addRestaurant/';
}

addRestaurantBtn.addEventListener('click', changeLocation);

const goToAddDishes = () => {
    location = './addDish/';
}
