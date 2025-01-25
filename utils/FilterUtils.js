export function updateAdvancedFilters(
  filteredRecipes,
  selectedTags,
  addTagCallback
) {
  const ingredients = new Set(); // Set pour stocker les ingrédients uniques
  const appliances = new Set(); // Set pour stocker les appareils uniques
  const ustensils = new Set(); // Set pour stocker les ustensiles uniques

  // Parcourir chaque recette et extraire ses ingrédients, appareils et ustensiles
  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => ingredients.add(ing.ingredient));
    appliances.add(recipe.appliance);
    recipe.ustensils.forEach((ust) => ustensils.add(ust));
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
    ".ustensil-options",
    Array.from(ustensils),
    selectedTags,
    addTagCallback
  );
}

// Effacer le contenu d'un menu déroulant
function clearDropdown(selector) {
  const dropdownContainer = document.querySelector(selector);
  dropdownContainer.innerHTML = "";
  return dropdownContainer;
}

// Filtrer les éléments déjà sélectionnés
function getUnselectedItems(items, selectedTags) {
  return items.filter((item) => !selectedTags.includes(item));
}

// Créer une option pour le menu déroulant
function createDropdownOption(item, selector, addTagCallback) {
  const option = document.createElement("li");
  option.textContent = item;
  option.classList.add("dropdown-item");
  option.addEventListener("click", () => addTagCallback(item, selector));
  return option;
}

// Ajouter des options au menu déroulant
function appendDropdownOptions(
  dropdownContainer,
  unselectedItems,
  selector,
  addTagCallback
) {
  unselectedItems.forEach((item) => {
    const option = createDropdownOption(item, selector, addTagCallback);
    dropdownContainer.appendChild(option);
  });
}

// Fonction principale pour mettre à jour les options du menu déroulant
export function updateFilterOptions(
  selector,
  items,
  selectedTags,
  addTagCallback
) {
  const dropdownContainer = clearDropdown(selector); // Vider le menu déroulant
  const unselectedItems = getUnselectedItems(items, selectedTags); // Obtenir les éléments non sélectionnés
  appendDropdownOptions(
    dropdownContainer,
    unselectedItems,
    selector,
    addTagCallback
  ); // Ajouter les options filtrées
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

      if (recipe.ustensils.some((ustensil) => ustensil.includes(tag))) {
        match = true;
      }

      return match;
    });
  });
}
