// Fonction pour filtrer et mapper les recettes
export const filterAndMapRecipes = (
  recipes,
  inputValue,
  selectedIngredient,
  selectedAppliance,
  selectedUstensils
) => {
  return recipes
    .filter((recipe) => {
      // Vérifie si le nom, la description ou un ingrédient correspond à la recherche
      const matchesInputValue =
        recipe.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        recipe.description.toLowerCase().includes(inputValue.toLowerCase()) ||
        recipe.ingredients.some((ingredientObj) =>
          ingredientObj.ingredient
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        );

      // Vérifie si un ingrédient spécifique est sélectionné et présent dans la recette
      const matchesSelectedIngredient =
        !selectedIngredient || // Pas de filtre si aucun ingrédient sélectionné
        recipe.ingredients.some((ingredientObj) =>
          ingredientObj.ingredient
            .toLowerCase()
            .includes(selectedIngredient.toLowerCase())
        );

      const matchesSelectedAppliance =
        !selectedAppliance || // Pas de filtre si aucun appareil sélectionné
        recipe.appliance
          .toLowerCase()
          .includes(selectedAppliance.toLowerCase());

      const matchesSelectedUstensils =
        !selectedUstensils || // Pas de filtre si aucun ustensile sélectionné
        recipe.ustensils.some((ustensil) =>
          ustensil.toLowerCase().includes(selectedUstensils.toLowerCase())
        );

      return (
        matchesInputValue &&
        matchesSelectedIngredient &&
        matchesSelectedAppliance &&
        matchesSelectedUstensils
      );
    })
    .map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      time: recipe.time,
      image: recipe.image,
      description: recipe.description,
      ingredients: recipe.ingredients,
      appliance: recipe.appliance,
      ustensils: recipe.ustensils,
    }));
};
