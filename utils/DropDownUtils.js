import filterAndMapRecipes from "../filterAndMapRecipes";
import recipes from "../data/recipes";

const filteredRecipes = filterAndMapRecipes(recipes);

// Extraire la liste des ingrédients en minuscule
const ingredientsList = filteredRecipes.flatMap((recipe) =>
  recipe.ingredients.map((item) => item.ingredient.toLowerCase())
);

// Extraire la liste des appareils en minuscule
const appliancesList = filteredRecipes.map((recipe) =>
  recipe.appliance.toLowerCase()
);

// Extraire la liste des ustensiles en minuscule
const ustensilsList = filteredRecipes.flatMap((recipe) =>
  recipe.ustensils.map((ustensil) => ustensil.toLowerCase())
);

// Fonction générique pour supprimer les doublons et les valeurs sélectionnées
const deleteDuplicates = (listValues, selectedValues) => {
  return [...new Set(listValues)].filter(
    (value) => !selectedValues.includes(value)
  );
};

// Fonction générique de filtrage pour les options du dropdown
const filterDropdown = (list, selectedValues) => {
  return deleteDuplicates(list, selectedValues);
};

// Fonction pour filtrer et mettre à jour les options d'un dropdown
export function filterDropdownOptions(
  inputElement,
  selector,
  listValues,
  selectedValues,
  updateFilterOptions
) {
  const searchValue = inputElement.value.toLowerCase(); // Récupère la valeur de recherche

  // Filtrer la liste de valeurs en fonction de la recherche et des éléments sélectionnés
  const filteredOptions = filterDropdown(listValues, selectedValues).filter(
    (option) => option.includes(searchValue) // Vérifie si l'élément contient la valeur recherchée
  );

  // Mettre à jour les options du menu déroulant
  updateFilterOptions(selector, filteredOptions);
}

// Exemples d'utilisation pour chaque catégorie (ingrédients, appareils, ustensiles)
export function handleIngredientFilter(
  inputElement,
  selector,
  selectedIngredients,
  updateFilterOptions
) {
  filterDropdownOptions(
    inputElement,
    selector,
    ingredientsList,
    selectedIngredients,
    updateFilterOptions
  );
}

export function handleApplianceFilter(
  inputElement,
  selector,
  selectedAppliances,
  updateFilterOptions
) {
  filterDropdownOptions(
    inputElement,
    selector,
    appliancesList,
    selectedAppliances,
    updateFilterOptions
  );
}

export function handleUstensilFilter(
  inputElement,
  selector,
  selectedUstensils,
  updateFilterOptions
) {
  filterDropdownOptions(
    inputElement,
    selector,
    ustensilsList,
    selectedUstensils,
    updateFilterOptions
  );
}
