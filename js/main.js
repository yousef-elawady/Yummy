
let tabsWidth = $('.tabs').innerWidth();
$('.side-menu').animate({left:`-${tabsWidth}`},10)
 $('.open').click(function(){
    if($('.side-menu').css('left')=='0px'){
        $('.side-menu').animate({left:`-${tabsWidth}`},1000);
        $('.open').addClass('fa-align-justify');
        $('.open').removeClass('fa-close');
        $('.links a').animate({top:300},500);
    }
    else{
        $('.side-menu').animate({left:0},800);
        $('.open').removeClass('fa-align-justify');
        $('.open').addClass('fa-close');

        $('.links a').eq(0).animate({top:0},500);
        $('.links a').eq(1).animate({top:0},600);
        $('.links a').eq(2).animate({top:0},700);
        $('.links a').eq(3).animate({top:0},800);
        $('.links a').eq(4).animate({top:0},900);
    }
 })


// -------loading-----------

 $(document).ready(function(){
    randomMeal().then(function(){
        $('.loading').fadeOut(500)
        $('body').css('overflow','auto')
    })

})

// ---------------------------start site-------------------

let allrandomData = [];

async function randomMeal() {
    try {
        let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
        let response = await result.json();
        
        if (response.meals) {
            allrandomData = response.meals;
            displayRandomMeal(allrandomData);
        } else {
            displayRandomMeal([]);
        }
    } catch (error) {
        console.error('Error fetching random meals:', error);
        displayRandomMeal([]);
    }
}

function displayRandomMeal(meals) {
    let cartona = '';
    
    if (meals.length === 0) {
        cartona = '<p>No meals found.</p>';
    } else {
        for (let i = 0; i < meals.length; i++) {
            cartona += `
            <div class="col-md-3">
                <div onclick="details('${meals[i].idMeal}')" class="inner position-relative">
                    <img class="w-100 rounded-2" src="${meals[i].strMealThumb}" alt="food">
                    <div class="layer position-absolute rounded-2">
                        <div class="layer-content text-black p-2 d-flex align-items-center h-100">
                            <h3>${meals[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
            </div>`;
        }
    }
    
    document.querySelector('.randomData').innerHTML = cartona;
}
randomMeal();

// ---------------------Categories-----------------------

let allCategories=[];
async function categories(){
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let response = await result.json();
    allCategories = response.categories;
    
}

function displayCategories(){
    $('.loading').fadeIn(500)
    document.querySelector('.search').innerHTML="";
    let cartona = ''
    for(let i = 0; i<allCategories.length; i++){
        cartona+=`
        <div class="col-md-3">
                <div onclick="oneCategory('${allCategories[i].strCategory}')" class="inner position-relative cursor cat">
                    <img class="w-100 rounded-2" src="${allCategories[i].strCategoryThumb}" alt="food">
                    <div class="layer position-absolute rounded-2">
                        <div class="layer-content text-black p-2 text-center h-100">
                            <h3>${allCategories[i].strCategory}</h3>
                            <p>${allCategories[i].strCategoryDescription.split(' ').slice(0,20).join(' ')}</p>
                        </div>
                    </div>
                </div>
        </div>`
    }
    document.querySelector('.randomData').innerHTML= cartona;
    $('.loading').fadeOut(500)
}

categories();

// -------------------area----------------

let allArea=[]
async function area(){
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let response = await result.json();
    allArea = response.meals;
}

function displayArea(){
    $('.loading').fadeIn(500);
    document.querySelector('.search').innerHTML="";
    let cartona = ''
    for(let i = 0; i<allArea.length; i++){
        cartona+=`
        <div class="col-md-3">
            <div onclick="oneArea('${allArea[i].strArea}')" class="rounded-2 text-center cursor">
               <i class="fa-solid fa-house-laptop fa-4x"></i>
               <h3>${allArea[i].strArea}</h3>
            </div>

        </div>`
    }
    document.querySelector('.randomData').innerHTML= cartona;
    $('.loading').fadeOut(500);

}

area()

// -----------------------Ingrredients---------------


let allIngrredients=[]
async function ingrredients(){
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let response = await result.json();
    allIngrredients = response.meals.slice(0,20);
}

function displayIngrredients(){
    $('.loading').fadeIn(500);
    document.querySelector('.search').innerHTML="";
    let cartona = ''
    for(let i = 0; i<allIngrredients.length; i++){
        cartona+=`
        <div class="col-md-3">
            <div onclick="oneIngrredient('${allIngrredients[i].strIngredient}')" class="rounded-2 text-center cursor">
               <i class="fa-solid fa-drumstick-bite fa-4x"></i>
               <h3>${allIngrredients[i].strIngredient}</h3>
               <p>${allIngrredients[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>

        </div>`
    }
    document.querySelector('.randomData').innerHTML= cartona;
    $('.loading').fadeOut(500);

}
ingrredients()

// ------------------------display one categories----------
let allOneCategory = []
async function oneCategory(categoryName){
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    let response = await result.json()
    allOneCategory = response.meals
    displayOneCategory(allOneCategory)
}

function displayOneCategory(){
    $('.loading').fadeIn(500);
    let cartona = ''
    for(let i = 0; i<allOneCategory.length; i++){
        cartona+=`
        <div class="col-md-3">
                <div onclick="details('${allOneCategory[i].idMeal}')" class="inner position-relative">
                    <img class="w-100 rounded-2" src="${allOneCategory[i].strMealThumb}" alt="food">
                    <div class="layer position-absolute rounded-2">
                        <div class="layer-content text-black p-2 d-flex align-items-center h-100">
                            <h3>${allOneCategory[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        </div>`
    }
    document.querySelector('.randomData').innerHTML= cartona;
    $('.loading').fadeOut(500);
}

// ----------------------display one area------------
let allOneArea = []
async function oneArea(areaName){
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
    let response = await result.json();
    allOneArea = response.meals;
    displayOneArea(allOneArea);
}

function displayOneArea(){
    $('.loading').fadeIn(500);
    let cartona = ''
    for(let i = 0; i<allOneArea.length; i++){
        cartona+=`
        <div class="col-md-3">
                <div onclick="details('${allOneArea[i].idMeal}')" class="inner position-relative">
                    <img class="w-100 rounded-2" src="${allOneArea[i].strMealThumb}" alt="food">
                    <div class="layer position-absolute rounded-2">
                        <div class="layer-content text-black p-2 d-flex align-items-center h-100">
                            <h3>${allOneArea[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        </div>`
    }
    document.querySelector('.randomData').innerHTML= cartona;
    $('.loading').fadeOut(500);

}

// --------------------display one ingrredients-----------------

let allOneIngrredient = []
async function oneIngrredient(ingrredientName){
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrredientName}`);
    let response = await result.json();
    allOneIngrredient = response.meals;
    displayOneIngrredient(allOneIngrredient);
}

function displayOneIngrredient(){
    $('.loading').fadeIn(500);
    let cartona = ''
    for(let i = 0; i<allOneIngrredient.length; i++){
        cartona+=`
        <div class="col-md-3">
                <div onclick="details('${allOneIngrredient[i].idMeal}')" class="inner position-relative">
                    <img class="w-100 rounded-2" src="${allOneIngrredient[i].strMealThumb}" alt="food">
                    <div class="layer position-absolute rounded-2">
                        <div class="layer-content text-black p-2 d-flex align-items-center h-100">
                            <h3>${allOneIngrredient[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        </div>`
    }
    document.querySelector('.randomData').innerHTML= cartona;
    $('.loading').fadeOut(500);

}

// -----------------------details------------------------

let allDetails = [];
async function details(mealId){
    document.querySelector('.search').innerHTML="";
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    let response = await result.json();
    allDetails = response.meals[0];
    displayDetails(allDetails);
}

function displayDetails(meal){
    $('.loading').fadeIn(500);
    let cartona = ''
    cartona+=`
            <div class="col-md-4">
                <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="food">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bold">Area : </span>${meal.strArea} </h3>
                <h3><span class="fw-bold">Category : </span>${meal.strCategory}</h3>
                <h3><span class="fw-bold">Recipes :</span></h3>
                `+getRecipes(meal)+`
                <h3><span class="fw-bold">Tags :</span></h3>
                `+getTags(meal)+`

                <div class="my-3">
                    <a class="btn btn-success" href="${meal.strSource}" target="_blank">Source</a>
                    <a class="btn btn-danger" href="${meal.strYoutube}" target="_blank">Youtube</a>
                </div>
            </div> `
            document.querySelector('.randomData').innerHTML= cartona;
            $('.loading').fadeOut(500);
}

// ------------------recipes-----------

function getRecipes(meal){
    var strdiv = "";
    for(let i = 1; i <= 20; i++){
        if(meal[`strIngredient${i}`]!=null && meal[`strIngredient${i}`]!= "" && meal[`strMeasure${i}`]!=null && meal[`strMeasure${i}`]!= "" ){
            strdiv+=`
            <div class="alert alert-info alert-trim">
                    `+meal[`strMeasure${i}`] +` `+meal[`strIngredient${i}`]+`
            </div>`
        }
    }
    return strdiv;
}

// ------------------tags-----------

function getTags(meal) {
    let strdiv = "";
    let tags = meal.strTags?.split(",") || [];

    for (let tag of tags) {
        tag = tag.trim();
        if (tag) { 
            strdiv += `
            <div class="alert alert-danger alert-trim">
                ${tag}
            </div>`;
        }
    }
    return strdiv;
}

// ----------------search by name-------------------

async function searchName(term){
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    let response =await result.json();
    console.log(response.meals);
    response.meals ? displayRandomMeal(response.meals) : displayRandomMeal([]);
}

function displaySearch(){
    let cartona ="";
    cartona+=`        
    <div class="row py-5">
            <div class="col-md-6">
                <input onkeyup="searchName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchFirstLetter(this.value)" class="form-control bg-transparent text-white" type="text" maxlength="1" placeholder="Search By First Letter">
            </div>
    </div>`
    document.querySelector('.search').innerHTML= cartona;
    document.querySelector('.randomData').innerHTML="";
}

// ---------------------search by first letter-------------

async function searchFirstLetter(term){
    if(term==""){
        term = "a";
    }
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    let response =await result.json();
    response.meals ? displayRandomMeal(response.meals) : displayRandomMeal([]);
}

// --------------------contact us-----------------

function contactUs(){
    document.querySelector('.randomData').innerHTML=`    
    <div class="contact text-center">
        <div class="container w-75">
            <div class="row gy-4">
                <div class="col-md-6">
                    <input oninput="validatAll(this)" type="text" class="form-control" placeholder="Enter Your Name" id="uName">
                    <div class="alert alert-danger d-none">
                      Special characters and numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input oninput="validatAll(this)" type="email" class="form-control" placeholder="Enter Your Email" id="uEmail">
                    <div class="alert alert-danger d-none">
                      Email not valid *exemple@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6">
                    <input oninput="validatAll(this)" type="text" class="form-control" placeholder="Enter Your Phone" id="uPhone">
                    <div class="alert alert-danger d-none">
                      Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input oninput="validatAll(this)" type="number" class="form-control" placeholder="Enter Your Age" id="uAge">
                    <div class="alert alert-danger d-none">
                      Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input oninput="validatAll(this)" type="password" class="form-control" placeholder="Enter Your Password" id="uPassword">
                    <div class="alert alert-danger d-none">
                      Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input oninput="validatAll(this)" type="password" class="form-control" placeholder="Repassword" id="uRepassword">
                    <div class="alert alert-danger d-none">
                      Enter valid repassword
                    </div>
                </div>
            </div>
            <button class="btn btn-outline-danger my-3" disabled id="submitBtn">Submit</button>
        </div>
    </div>`
}

// -----------------validations-----------------

function validatAll(elem){
    var regex ={
        uName:/^[a-zA-Z ]+$/,
        uEmail:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        uPhone:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        uAge:/^(1[89]|[2-9][0-9])$/,
        uPassword:/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
        uRepassword: new RegExp(`^${document.getElementById('uPassword').value}$`)
    }
    if(regex[elem.id].test(elem.value)==true){
        elem.classList.add('is-valid');
        elem.classList.remove('is-invalid');
        elem.nextElementSibling.classList.replace('d-block', 'd-none');
    }
    else{
        elem.classList.add('is-invalid');
        elem.classList.remove('is-valid');
        elem.nextElementSibling.classList.replace('d-none', 'd-block');
    }
        const allInputs = [
            document.getElementById('uName'),
            document.getElementById('uEmail'),
            document.getElementById('uPhone'),
            document.getElementById('uAge'),
            document.getElementById('uPassword'),
            document.getElementById('uRepassword')
        ];
    
        const allValid = allInputs.every(input => regex[input.id].test(input.value));
        const submitButton = document.getElementById('submitBtn');
        submitButton.disabled = !allValid;
}
