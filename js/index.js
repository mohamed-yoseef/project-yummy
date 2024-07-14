/// <reference types="../@types/jquery" />

$(".list-unstyled").hide(1000);
$("#icon-nav").on("click", function () {
  $(".nav-tab ").animate({ marginLeft: "0px" }, 1000, function () {
    $(".list-unstyled").slideDown(1000);
  });
  $("#icon-nav").hide(500);
  $("#solid").show(1000);
});
$("#solid").on("click", function () {
  $(".nav-tab ").animate({ marginLeft: "-250px" }, 1000, function () {
    $(".list-unstyled").slideUp(500);
  });
  $("#icon-nav").show(1000);
  $("#solid").hide(500);
});

$(".py-2").on("click", function () {
  $(".nav-tab ").animate({ marginLeft: "-250px" }, 1000, function () {});
  $("#icon-nav").show(1000);
  $("#solid").hide(500);
});

// $(".m-1").on("click", function () {
//   $("#youRow ").hide(500)
// });

// ----------api------------

apiLast = [];

async function allIpi() {
  loading.classList.remove("d-none");
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let data = await response.json();
  apiLast = data.categories;
  console.log(apiLast);

  apiCategories();
  loading.classList.add("d-none");
}

function apiCategories() {
  box = "";
  for (let i = 0; i < apiLast.length; i++) {
    box += ` <div  class="col-md-3 ">
                    <div onclick="filter()" id="image" class="img-contin">
                        <img src="${apiLast[i].strCategoryThumb}" width="100%" alt="">
                        <div class="text-contin p-2">
                            <h3  class="">${apiLast[i].strCategory}</h3>
                            <p  class="pb-1">${apiLast[i].strCategoryDescription}</p>
                        </div>
                    </div>
                </div>`;
  }
  document.getElementById("category").innerHTML = box;
}
// ---------
filterList = [];
async function filter() {
  var loading = document.getElementById("loading");
  loading.classList.remove("d-none");
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken"
  );
  let data = await response.json();
  filterList = data.meals;
  console.log(filterList);
  filterCategory();
  loading.classList.add("d-none");
}
function filterCategory() {
  box = "";
  for (let i = 0; i < filterList.length; i++) {
    box += ` <div class="col-sm-6 col-lg-2 m-3">
                    <div onclick="details()" class="img-contin">
                        <img  src="${filterList[i].strMealThumb}" width="100%" alt="">
                        <div class="text-contin p-2">
                            <h3>${filterList[i].strMeal}</h3>

                        </div>
                    </div>
                </div>`;
  }
  document.getElementById("category").innerHTML = box;
}

filter();
// ---------
let Categories = document.getElementById("Categories");
Categories.addEventListener("click", function () {
  allIpi();
});

// --------------area---------------
areaList = [];
async function area() {
  loading.classList.remove("d-none");
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let data = await response.json();
  areaList = data.meals;
  console.log(areaList);
  apiArea();
  loading.classList.add("d-none");
}

function apiArea() {
  box = "";
  for (let i = 0; i < areaList.length; i++) {
    box += ` <div class="col-sm-6 col-lg-2 m-3">
                    <div class="img-contin">
                       
                    <div onclick="filter()" class="overlay ">
                     <i class="fa-solid fa-house-laptop text-center" ></i>
                    <h3 class="text-center">${areaList[i].strArea}</h3>
                           
                        </div>
                    </div>
                </div>`;
  }
  document.getElementById("category").innerHTML = box;
}

document.getElementById("area").addEventListener("click", function () {
  area();
});

// --------------------ingredient---------------------
ingredientList = [];
async function ingredient() {
  loading.classList.remove("d-none");
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let data = await response.json();
  ingredientList = data.meals;
  console.log(ingredientList);
  apiIngredient();
  loading.classList.add("d-none");
}

function apiIngredient() {
  box = "";
  for (let i = 0; i < ingredientList.length; i++) {
    box += ` <div class="col-sm-6 col-lg-2 m-3">
                    <div class="img-contin">
                    <div onclick="filter()" class="overlay">
                     <i class="fa-solid fa-drumstick-bite fa-4x" ></i>
                    <h3  class="text-center">${ingredientList[i].strIngredient}</h3>
                     <p >The bay leaf is an aromatic leaf commonly used in cooking. It can be used whole, or as dried and ground</p>
                           
                        </div>
                    </div>
                </div>`;
  }
  document.getElementById("category").innerHTML = box;
}

document.getElementById("ingredient").addEventListener("click", function () {
  ingredient();
});
// --------------search-----------------

searchList = [];
async function search() {
  loading.classList.remove("d-none");
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken"
  );
  let data = await response.json();
  searchList = data.meals;
  console.log(searchList);

  apiSearch();
  loading.classList.add("d-none");
}

function apiSearch() {
  let InputName = document.getElementById("input-name");
  let inputItem = document.getElementById("input-item");
  let term = inputItem.value;
  let Name = InputName.value;
  box = "";
  for (let i = 0; i < searchList.length; i++) {
    if (
      searchList[i].strMeal.includes(term) == true &&
      searchList[i].strMeal.includes(Name) == true
    ) {
      box += ` <div class="col-md-3 ">
    <div onclick="filter()" id="image" class="img-contin">
        <img src="${searchList[i].strMealThumb}" width="100%" alt="">
        <div class="text-contin p-2">
            <h3>${searchList[i].strMeal}</h3>
        </div>
    </div>
</div>`;
    }
  }
  document.getElementById("category").innerHTML = box;
}
// -------
function searchArea() {
  cartoon = `  <div class="col-md-6">
            <input id="input-name" oninput="search()" type="search" class="form-control my-3 mx-2 bg-transparent" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input id="input-item" oninput="search()" type="search"
                    class="form-control my-3 mx-2 bg-transparent" placeholder="Search By First Letter">
        </div>`;
  document.getElementById("youRow").innerHTML = cartoon;
}
// ---------
document.getElementById("myRow").addEventListener("click", function () {
  searchArea();
});

brestList = [];
async function brest() {
  loading.classList.remove("d-none");
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast"
  );
  let data = await response.json();
  brestList = data.meals;
  console.log(brestList);
  brestCategory();
  loading.classList.add("d-none");
}
function brestCategory() {
  box = "";
  for (let i = 0; i < brestList.length; i++) {
    box += ` <div class="col-sm-6 col-lg-2 flex-grow-2 m-3">
                    <div onclick="" class="img-contin">
                        <img  src="${brestList[i].strMealThumb}" width="100%" alt="">
                        <div class="text-contin p-2">
                            <h3>${brestList[i].strMeal}</h3>

                        </div>
                    </div>
                </div>`;
  }
  document.getElementById("category").innerHTML = box;
}
// ------------------------------------$
detailsList = [];
async function details() {
  loading.classList.remove("d-none");
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772"
  );
  let data = await response.json();
  detailsList = data.meals;
  console.log(detailsList);
  detailsContin();
  loading.classList.add("d-none");
}
function detailsContin() {
  container = "";
  for (let i = 0; i < detailsList.length; i++) {
    container = `  <div class="col-md-4">
                <div class="item-image">
                    <img src="${detailsList[i].strMealThumb}" width="300px" alt="">
                    <h3 class="my-1"> ${detailsList[i].strMeal}</h3>
                </div>
            </div>
            <div class="col-md-7 flex-grow-2">
                <div class="item-text">
                    <h3>Instructions</h3>
                    <p>${detailsList[i].strInstructions}</p>
                    <h3> Area :<span>${detailsList[i].strArea}</span></h3>
                    <h3>Category : <span>${detailsList[i].strCategory}</span>Side</h3>
                    <h3 class="span">Recipes : <div>
                    <span>1 cup Lentils</span>
                    <span>1 large Onion</span> <span>1/2 tsp Mint</span> <span>Pinch Sea Salt</span> <span><span>1/2 tsp Thyme</span></span></div> </h3>
                    <h3>Tags :</h3>
                    <button class="btn btn-light p2">Soup</button>
                    <div class="py-2">
                        <button class="btn btn-danger p2">Soup</button>
                    <button class="btn btn-warning  p2">Soup</button>
                    </div>
                </div>
            </div>`;
  }
  document.getElementById("category").innerHTML = container;
}

// --------------------------------------#

function contactus() {
  const Contact = `
    <div class="container form-container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h2 class="text-center mb-4">Registration Form</h2>
                <form id="registrationForm" novalidate>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <input type="text" class="form-control" id="name" placeholder="Name" required pattern="[A-Za-z]{2,10}">
                            <div class="invalid-feedback">Please enter a valid name (at least 2 characters, letters only).</div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <input type="number" class="form-control" id="age" placeholder="Age" min="1" max="120" required>
                            <div class="invalid-feedback">Please enter a valid age (between 1 and 120).</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <input type="tel" class="form-control" id="phone" placeholder="Phone Number" pattern="\d{10}" required>
                            <div class="invalid-feedback">Please enter a valid phone number (10 digits only).</div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <input type="email" class="form-control" id="email" placeholder="Email" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}">
                            <div class="invalid-feedback">Please enter a valid email address.</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <input type="password" class="form-control" id="password" placeholder="Password" required pattern="(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,}">
                            <div class="invalid-feedback">Password must contain at least one number, one lowercase and one uppercase letter, and at least 6 or more characters.</div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password" required pattern="(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,}">
                            <div class="invalid-feedback">Passwords do not match.</div>
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button class="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


`;
  document.getElementById("category").innerHTML = Contact;
  document.getElementById("registrationForm").addEventListener(
    "submit",
    function (event) {
      var form = event.target;
      var password = document.getElementById("password");
      var confirmPassword = document.getElementById("confirmPassword");

      if (!form.checkValidity() || password.value !== confirmPassword.value) {
        event.preventDefault(); //
        event.stopPropagation();

        if (password.value !== confirmPassword.value) {
          confirmPassword.setCustomValidity("Passwords do not match."); //
        } else {
          confirmPassword.setCustomValidity("");
        }

        form.classList.add("was-validated");
      }
    },
    false
  );
}
document.getElementById("Contact").addEventListener("click", function () {
  contactus();
});
