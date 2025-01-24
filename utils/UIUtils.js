// Function to update the UI with the filtered recipes
export function updateCards(
  recipesToShow,
  recipesContainer,
  recipeCardFactory
) {
  recipesContainer.innerHTML = "";

  // Loop through each recipe and create a card using the RecipeCardFactory
  recipesToShow.forEach((recipe) => {
    const recipeCard = recipeCardFactory.createRecipeCard(recipe); // Create a new recipe card
    recipesContainer.appendChild(recipeCard); // Append the recipe card to the container
  });
}

// Function to display a message when no results are found for a query
export function displayNoResultsMessage(query, errorContainer) {
  // Display a custom error message with the user's query
  errorContainer.innerHTML = `
      <p>Aucune recette ne contient '${query}'. Vous pouvez chercher des termes comme « tarte aux pommes », « poisson », etc.</p>
  `;
}

// Function to update the displayed count of recipes
export function updateRecipeCount(count, recipesCountElement) {
  // Update the text content to show the number of recipes found
  recipesCountElement.textContent = `${count} recettes`;
}
