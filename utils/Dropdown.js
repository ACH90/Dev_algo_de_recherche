export function handleDropdownOption(event, option) {
  //Recuperer la valeur de l'input
  const inputValue = event.target.value.toLowerCase();

  console.log("Voici la valeur de l'input", inputValue);

  //Filtrer les options du dropdown
  const filteredOptions = option.filter((option) =>
    option.toLowerCase().includes(inputValue)
  );

  // Mettre à jour le dropdown avec les options filtrées
  updateFilterOptions(".ingredient-options", filteredOptions);
}

// Fonction pour mettre à jour les filtres avancés
export function updateAdvancedFilters(
  filteredRecipes,
  selectedTags,
  addTagCallback
) {
  const ingredients = new Set(); // Set pour stocker les ingrédients uniques
  const appliances = new Set(); // Set pour stocker les appareils uniques
  const utensils = new Set(); // Set pour stocker les ustensiles uniques

  // Parcourir chaque recette et extraire ses ingrédients, appareils et ustensiles
  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => ingredients.add(ing.ingredient));
    appliances.add(recipe.appliance);
    recipe.ustensils.forEach((ust) => utensils.add(ust));
  });

  console.log("Ingredients dans FilterUtils:", ingredients);
  console.log("Appliances dans FilterUtils:", appliances);
  console.log("Ustensils dans FilterUtils:", utensils);

  // Mettre à jour les options du menu déroulant avec les éléments de filtre disponibles et non sélectionnés
  updateFilterOptions(
    ".ingredient-options",
    Array.from(ingredients).sort(), // Tri des ingrédients pour un affichage ordonné
    selectedTags,
    addTagCallback
  );
  updateFilterOptions(
    ".appliance-options",
    Array.from(appliances).sort(), // Tri des appareils pour un affichage ordonné
    selectedTags,
    addTagCallback
  );
  updateFilterOptions(
    ".utensil-options",
    Array.from(utensils).sort(), // Tri des ustensiles pour un affichage ordonné
    selectedTags,
    addTagCallback
  );
}
