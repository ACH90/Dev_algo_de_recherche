export function searchRecipes(query, recipes) {
  // Pré-calculer la requête en minuscules pour des comparaisons efficaces
  const lowerQuery = query.toLowerCase();

  // Retourner toutes les recettes si la requête fait moins de 3 caractères
  if (lowerQuery.length < 3) return recipes;

  // Filtrer les recettes en fonction de la correspondance du nom de la recette, de la description ou des ingrédients
  return recipes.filter((recipe) => {
    // Pré-calculer le nom et la description de la recette en minuscules
    const name = recipe.name ? recipe.name.toLowerCase() : "";
    const description = recipe.description
      ? recipe.description.toLowerCase()
      : "";

    // Retourner immédiatement si le nom ou la description correspond à la requête
    if (name.includes(lowerQuery) || description.includes(lowerQuery)) {
      return true;
    }

    // Vérifier si un ingrédient correspond à la requête
    return recipe.ingredients.some(
      (ingredient) =>
        ingredient.ingredient &&
        ingredient.ingredient.toLowerCase().includes(lowerQuery)
    );
  });
}
