import recipes from "../data/recipes.js";
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
function updateFilterOptions(selector, filteredOptions, selectedTags) {
  const dropdownContainer = document.querySelector(selector);
  dropdownContainer.innerHTML = ""; // Vider les options existantes

  // Ajouter chaque option filtrée dans le dropdown
  filteredOptions.forEach((option) => {
    // Ne pas afficher les options déjà sélectionnées
    if (!selectedTags.includes(option)) {
      const optionElement = document.createElement("li");
      optionElement.textContent = option;
      optionElement.classList.add("dropdown-item");
      dropdownContainer.appendChild(optionElement);
    }
  });
}

//-------------------------

// Fonction pour gérer le filtrage des ingrédients
export function handleIngredientFilter(inputElement) {
  const ingredientsList = recipes.flatMap(
    (recipe) => recipe.ingredients.map((item) => item.ingredient.toLowerCase()) // Liste des ingrédients en minuscule
  );
  console.log("Voici la liste des ingrédients", ingredientsList);

  // Appeler la fonction de filtrage et mettre à jour le dropdown
  filterDropdownOptions(
    inputElement,
    ".ingredient-options", // Sélecteur du dropdown à mettre à jour
    ingredientsList, // Liste des ingrédients à filtrer

    updateFilterOptions // Fonction pour mettre à jour les options du dropdown
  );
}

// Fonction pour gérer le filtrage des appareils
export function handleApplianceFilter(inputElement) {
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
export function handleUstensilFilter(inputElement) {
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

//------------------------------------------

function filterDropdownOptions(
  inputElement,
  selector,
  list,
  selectedTags,
  updateFilterOptions
) {
  const searchTerm = inputElement.value.toLowerCase();

  // Filtrer les éléments de la liste en fonction de ce que l'utilisateur tape
  const filteredList = list.filter((item) =>
    item.toLowerCase().includes(searchTerm)
  );

  // Mettre à jour le dropdown avec les éléments filtrés
  updateFilterOptions(selector, filteredList, selectedTags);
}
