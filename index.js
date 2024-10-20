// .................................Array of Objects..................................................
const recipes = [
    {
        title: "Spaghetti Bolognese",
        ingredients: "Spaghetti, Ground Beef, Tomato Sauce, Garlic, Onions, Olive Oil",
        steps: "1. Boil pasta. 2. Cook ground beef. 3. Add sauce and garlic. 4. Mix with pasta."
    },
    {
        title: "Chicken Curry",
        ingredients: "Chicken, Curry Powder, Coconut Milk, Onions, Garlic, Ginger",
        steps: "1. Cook chicken. 2. Add onions, garlic, ginger. 3. Add coconut milk and curry powder. 4. Simmer."
    },
    {
        title: "Vegetable Stir-fry",
        ingredients: "Broccoli, Carrots, Bell Peppers, Soy Sauce, Garlic, Olive Oil",
        steps: "1. Stir-fry vegetables in olive oil. 2. Add garlic and soy sauce. 3. Serve with rice."
    },
];

// ..............................................Code to create and Display Recipe Cards........................................
const displayRecipes = () => {
    const recipelist = document.querySelector("#recipelist");
    recipelist.innerHTML = "";

    recipes.forEach((recipe) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("bg-white", "p-4", "rounded", "shadow", "m-4");

        recipeCard.innerHTML = `
        <h2 class="text-lg font-bold">${recipe.title}</h2>
        <p class="text-sm text-gray-400 font-thin"><strong>Ingredients: </strong>${recipe.ingredients}</p>
        <p class="text-sm font-thin"><strong>Steps: </strong>${recipe.steps}</p>
        <button class="bg-blue-500 text-white px-2 py-1 rounded mt-2">Edit</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded m-2">Delete</button>
        `;
        recipelist.appendChild(recipeCard);
    });
}

// ..............................................Code to Add Recipe........................................
const addRecipe = (event) => {
    event.preventDefault();
    const recipeTitle = document.getElementById("recipeTitle").value.trim();
    const recipeIngredients = document.getElementById("recipeIngredients").value.trim();
    const recipeStep = document.getElementById("recipeStep").value.trim();

    if (recipeTitle !== "" && recipeIngredients !== "" && recipeStep !== "") {
        const isDuplicated = recipes.some((recipe) => recipe.title.toLowerCase() === recipeTitle.toLowerCase());
        if (isDuplicated) {
            alert("Recipe already exists");
        } else {
            const newRecipe = {
                title: recipeTitle,
                ingredients: recipeIngredients,
                steps: recipeStep,
            };
            recipes.push(newRecipe);

            document.getElementById("recipeTitle").value = "";
            document.getElementById("recipeIngredients").value = "";
            document.getElementById("recipeStep").value = "";

            displayRecipes();
        }
    } else {
        alert("Please fill out all the fields");
    }
}

// ..............................................Code to make Add Recipe Button Functional........................................
document.querySelector("#addRecipe").addEventListener("click", addRecipe);

displayRecipes();