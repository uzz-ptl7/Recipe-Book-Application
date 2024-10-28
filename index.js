let recipes = [];

// Function to display recipes
const displayRecipes = () => {
    const recipelist = document.getElementById("recipelist");
    if (recipelist) {
        recipelist.innerHTML = "";
        recipes.forEach((recipe, index) => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");
            recipeCard.innerHTML = `
                <div class="border border-black rounded-xl shadow-xl p-2">
                <h2 class="text-lg font-bold">${recipe.title}</h2>
                <p class="text-sm text-gray-400 font-thin"><strong>Ingredients: </strong>${recipe.ingredients}</p>
                <p class="text-sm font-thin"><strong>Steps: </strong>${recipe.steps}</p>
                <button class="bg-blue-500 text-white px-2 py-1 rounded mt-2" onclick="editRecipe(${index})">Edit</button>
                <button class="bg-red-500 text-white px-2 py-1 rounded m-2" onclick="deleteRecipe(${index})">Delete</button>
                </div>
            `;
            recipelist.appendChild(recipeCard);
        });
    }
}

// Function to save recipes to local storage
const saveRecipeToLocalStorage = () => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

// Function to load recipes from local storage
const loadRecipesFromLocalStorage = () => {
    const storedRecipe = localStorage.getItem("recipes");
    if (storedRecipe) {
        recipes = JSON.parse(storedRecipe);
    }
}

// Function to show error messages
const showError = (elementId, message) => {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.innerHTML = message;
        errorElement.classList.remove("hidden");
    }
}

// Function to hide error messages
const hideError = (elementId) => {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.classList.add("hidden");
    }
}

// Function to add a new recipe
const addRecipe = (event) => {
    event.preventDefault();
    const title = document.getElementById("recipeTitle").value;
    const ingredients = document.getElementById("recipeIngredients").value;
    const steps = document.getElementById("recipeSteps").value;

    if (title && ingredients && steps) {
        recipes.push({ title, ingredients, steps });
        saveRecipeToLocalStorage();
        displayRecipes();
        document.getElementById("recipeForm").reset();
        hideError("titleError");
        hideError("ingredientsError");
        hideError("stepsError");
    } else {
        if (!title) showError("titleError", "Recipe title is required.");
        if (!ingredients) showError("ingredientsError", "Recipe ingredients are required.");
        if (!steps) showError("stepsError", "Recipe steps are required.");
    }
}

// Function to edit a recipe
const editRecipe = (index) => {
    const UpdateRecipeTitle = prompt("Enter new recipe title", recipes[index].title);
    const UpdateRecipeIngredients = prompt("Enter new recipe ingredients", recipes[index].ingredients);
    const UpdateRecipeSteps = prompt("Enter the new recipe steps", recipes[index].steps);

    if (UpdateRecipeTitle && UpdateRecipeIngredients && UpdateRecipeSteps) {
        recipes[index].title = UpdateRecipeTitle;
        recipes[index].ingredients = UpdateRecipeIngredients;
        recipes[index].steps = UpdateRecipeSteps;
        saveRecipeToLocalStorage();
        displayRecipes();
    }
}

// Function to delete a recipe
const deleteRecipe = (index) => {
    recipes.splice(index, 1);
    saveRecipeToLocalStorage();
    displayRecipes();
}

// Event listener for the add recipe form
const recipeForm = document.getElementById("recipeForm");
if (recipeForm) {
    recipeForm.addEventListener("submit", addRecipe);
}

// Load recipes from local storage and display them on page load
loadRecipesFromLocalStorage();
displayRecipes();