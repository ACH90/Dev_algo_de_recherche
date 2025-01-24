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

//-------------------------

// Fonction pour gérer le filtrage des ingrédients
function handleIngredientFilter(inputElement) {
  const ingredientsList = recipes.flatMap((recipe) =>
    recipe.ingredients.map((item) => item.ingredient.toLowerCase())
  );
  filterDropdownOptions(
    inputElement,
    ".ingredient-options",
    ingredientsList,
    selectedTags,
    updateFilterOptions
  );
}

// Fonction pour gérer le filtrage des appareils
function handleApplianceFilter(inputElement) {
  const appliancesList = recipes.map((recipe) =>
    recipe.appliance.toLowerCase()
  );
  filterDropdownOptions(
    inputElement,
    ".appliance-options",
    appliancesList,
    selectedTags,
    updateFilterOptions
  );
}

// Fonction pour gérer le filtrage des ustensiles
function handleUstensilFilter(inputElement) {
  const ustensilsList = recipes.flatMap((recipe) =>
    recipe.ustensils.map((ustensil) => ustensil.toLowerCase())
  );
  filterDropdownOptions(
    inputElement,
    ".ustensil-options",
    ustensilsList,
    selectedTags,
    updateFilterOptions
  );
}
