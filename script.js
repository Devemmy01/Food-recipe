const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')


const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction)) 


const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


function scrollHeader(){
    const nav = document.getElementById('header')

    if(this.scrollY >= 200)
    nav.classList.add("scroll-header");
    else nav.classList.remove("scroll-header")
}

window.addEventListener("scroll", scrollHeader)


function scrollTop(){
    const scrollTop = document.getElementById('scroll-top')

    if(this.scrollY >= 560)
    scrollTop.classList.add("scroll-top");
    else scrollTop.classList.remove("scroll-top")
}

window.addEventListener("scroll", scrollTop)







const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe')
});



// get result that matches with the search
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(` https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Check Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, no result found!"
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}



//Getting meal recipe


function getMealRecipe(e){
    e.preventDefault();
    console.log(e.target);
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0]
    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
            <p class="recipe-category">${meal.strCategory}</p>
            <div class="recipe-instruction">
                <h3>Instructions:</h3>
                <p>
                    ${meal.strInstructions}
                </p>

            </div>
            <div class="recipe-meal-img">
                <img src="${meal.strMealThumb}" alt="">
            </div>
            <div class="recipe-link">
                <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
            </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}




const sr= ScrollReveal({
    origin:'top',
    distance:'60px',
    duration:2500,
    delay:400,
})

sr.reveal(`.home__title, blockquote`)
sr.reveal(`.home__subtitle`, {delay:500})
sr.reveal(`.homeimg`, {delay: 600})
sr.reveal(`.meal-search`, {delay: 800})
sr.reveal(`.title`, {delay: 900, interval: 100, origin: 'top'})
