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

  // Mettre à jour les options du menu déroulant avec les éléments de filtre disponibles et non sélectionnés
  updateFilterOptions(
    ".ingredient-options",
    Array.from(ingredients),
    selectedTags,
    addTagCallback
  );
  updateFilterOptions(
    ".appliance-options",
    Array.from(appliances),
    selectedTags,
    addTagCallback
  );
  updateFilterOptions(
    ".utensil-options",
    Array.from(utensils),
    selectedTags,
    addTagCallback
  );
}

// Fonction pour remplir les menus déroulants avec les options de filtre disponibles
export function updateFilterOptions(
  selector,
  items,
  selectedTags,
  addTagCallback
) {
  const dropdownContainer = document.querySelector(selector);
  dropdownContainer.innerHTML = ""; // Effacer les éléments existants du menu déroulant

  // Filtrer les éléments sélectionnés des options du menu déroulant
  const unselectedItems = items.filter((item) => !selectedTags.includes(item));

  // Créer et ajouter des options de menu déroulant pour les éléments non sélectionnés
  unselectedItems.forEach((item) => {
    const option = document.createElement("li");
    option.textContent = item;
    option.classList.add("dropdown-item");
    option.addEventListener("click", () => addTagCallback(item, selector));
    dropdownContainer.appendChild(option);
  });
}

// Fonction pour filtrer les recettes en fonction des tags sélectionnés
export function filterRecipesByTags(recipes, selectedTags) {
  return recipes.filter((recipe) => {
    return selectedTags.every((tag) => {
      let match = false;

      if (
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.includes(tag)
        )
      ) {
        match = true;
      }

      if (recipe.appliance.includes(tag)) {
        match = true;
      }

      if (recipe.ustensils.some((utensil) => utensil.includes(tag))) {
        match = true;
      }

      return match;
    });
  });
}
