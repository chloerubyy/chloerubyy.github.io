/* javascript for recipe app */

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

    fetchRecipes(ingredient);
});

// Fetch recipes based on ingredient
function fetchRecipes(ingredient) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data.meals);
        })
        .catch(error => console.error("Error:", error));
}

// Display recipe cards
function displayRecipes(meals) {
    results.innerHTML = "";

    if (!meals) {
        results.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    meals.forEach(meal => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
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
    results.innerHTML = `
        <button id="backBtn">← Back</button>
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strInstructions}</p>
    `;

    // Back button
    document.getElementById("backBtn").addEventListener("click", () => {
        results.innerHTML = "";
    });
}