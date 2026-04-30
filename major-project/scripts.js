/* javascript for recipe app */

// Store last search term for back button functionality
let lastSearch = "";

// Get DOM elements
const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");

// Search button click event
searchBtn.addEventListener("click", () => {
    const ingredient = document.getElementById("ingredientInput").value.trim();

    if (ingredient === "") {
        alert("Please enter an ingredient");
        return;
    }

    lastSearch = ingredient;
    fetchRecipes(ingredient);
    document.getElementById("ingredientInput").value = "";
});

document.getElementById("randomBtn").addEventListener("click", () => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]));
});

// Allow Enter key to trigger search
document.getElementById("ingredientInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

// Fetch recipes based on ingredient
function fetchRecipes(ingredient) {
    results.innerHTML = `
    <div class="loading">
        <p>Finding recipes...</p>
    </div>
`;

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data.meals);
        })
        .catch(error => {
            console.error("Error:", error);
            results.innerHTML = "<p>Something went wrong. Try again.</p>";
        });
}

// Display recipe cards
function displayRecipes(meals) {
    results.innerHTML = `<p class="search-title">Results for "${lastSearch}"</p>`;

    if (!meals) {
        results.innerHTML = "<p>No recipes found. Try another ingredient.</p>";
        return;
    }

    meals.forEach(meal => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        card.innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <h3>${meal.strMeal}</h3>
    <p class="click-hint">Tap to view recipe</p>
`;

        // Click event to fetch and display full recipe details
        card.addEventListener("click", () => {
            fetchMealDetails(meal.idMeal);
        });

        results.appendChild(card);
    });
}

// Fetch full recipe details by ID
function fetchMealDetails(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {
            displayMealDetails(data.meals[0]);
        })
        .catch(error => console.error("Error:", error));
}

// Display full recipe details
function displayMealDetails(meal) {
    results.innerHTML = "";
    results.classList.add("detail-view");

    const detail = document.createElement("div");
    detail.classList.add("recipe-detail");

    let ingredients = "";

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
            ingredients += `<li>${measure} ${ingredient}</li>`;
        }
    }

    detail.innerHTML = `
    <button id="backBtn">← Back</button>
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

    <h3>Ingredients</h3>
    <ul class="ingredients-list">
        ${ingredients}
    </ul>

    <h3>Instructions</h3>
    <p>${meal.strInstructions.replace(/\n/g, "<br><br>")}</p>
`;

    results.appendChild(detail);

    document.getElementById("backBtn").addEventListener("click", () => {
        results.classList.remove("detail-view");
        fetchRecipes(lastSearch);
    });
}