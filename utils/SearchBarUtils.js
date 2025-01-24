export function searchRecipes(query, recipes) {
  // Precompute the lowercased query for efficient comparisons
  const lowerQuery = query.toLowerCase();

  // Return all recipes if the query is less than 3 characters
  if (lowerQuery.length < 3) return recipes;

  // Filter recipes based on matching the recipe name, description, or ingredients
  return recipes.filter((recipe) => {
    // Precompute lowercased name and description for the recipe
    const name = recipe.name ? recipe.name.toLowerCase() : "";
    const description = recipe.description
      ? recipe.description.toLowerCase()
      : "";

    // Early return if name or description matches the query
    if (name.includes(lowerQuery) || description.includes(lowerQuery)) {
      return true;
    }

    // Check if any ingredient matches the query
    return recipe.ingredients.some(
      (ingredient) =>
        ingredient.ingredient &&
        ingredient.ingredient.toLowerCase().includes(lowerQuery)
    );
  });
}
