import RecipeCardFactory from "./utils/RecipeCardFactory.js";
import { searchRecipes } from "./utils/SearchBarUtils.js";
import {
  updateAdvancedFilters,
  updateFilterOptions,
  filterRecipesByTags,
} from "./utils/FilterUtils.js";
import {
  addTag,
  removeTag,
  removeOptionFromDropdown,
  addOptionToDropdown,
} from "./utils/TagUtils.js";
import { updateCards, updateRecipeCount } from "./utils/UIUtils.js";
import { filterDropdownOptions } from "./utils/DropDownUtils.js";
import recipes from "./data/recipes.js";

//----------------------------

let currentInputValue = ""; // recherche actuelle
let selectedTags = [];

//dataLoader
let filteredRecipes = [...recipes]; // Par défaut, toutes les recettes sont affichées

//QuerySelectors

//header
const searchBar = document.querySelector(".search-bar");

//DropdownFilter
const ingredientSearchInput = document.querySelector(
  ".ingredient-search-input"
);
const applianceSearchInput = document.querySelector(".appliance-search-input");
const ustensilSearchInput = document.querySelector(".ustensil-search-input");
const recipesCount = document.querySelector(".recipe-count-number");

//Tag
const tagContainerUnified = document.querySelector(".tag-container-unified");

//Main
const recipesContainer = document.querySelector(".recipes-container");

//error
const errorContainer = document.createElement("div");
errorContainer.classList.add("no-results-message");
recipesContainer.parentElement.appendChild(errorContainer);

const recipeCardFactory = new RecipeCardFactory();
updateRecipeCount(filteredRecipes.length, recipesCount);

//----------------------------

// Fonction pour mettre à jour les filtres et rafraîchir les recettes affichées
function updateFilters() {
  // D'abord, filtrer les recettes par tags
  let filteredByTags = filterRecipesByTags(recipes, selectedTags);

  // Si la requête de recherche est vide, ne pas appliquer de filtrage de recherche, seulement un filtrage par tags
  if (currentInputValue.length === 0) {
    filteredRecipes = filteredByTags; // Afficher toutes les recettes filtrées par tags
  } else {
    // Appliquer la requête de recherche aux recettes filtrées par tags
    filteredRecipes = searchRecipes(currentInputValue.trim(), filteredByTags);
  }

  // Si aucune recette n'est trouvée, afficher un message d'erreur
  if (filteredRecipes.length === 0) {
    errorContainer.innerHTML = "Aucune recette ne correspond à la recherche";
  } else {
    errorContainer.innerHTML = "";
  }

  // Mettre à jour les cards avec les recettes filtrées
  updateCards(filteredRecipes, recipesContainer, recipeCardFactory);

  // Mettre à jour les options du menu déroulant avec les options disponibles basées sur les recettes filtrées
  updateAdvancedFilters(filteredRecipes, selectedTags, handleAddTag);

  // Mettre à jour le nombre de recettes
  updateRecipeCount(filteredRecipes.length, recipesCount);
}

// Ajouter un tag et mettre à jour les filtres lorsqu'un nouveau tag est sélectionné
function handleAddTag(tagText, selector) {
  if (
    addTag(
      tagText,
      selector,
      selectedTags,
      tagContainerUnified,
      handleRemoveTag,
      updateFilters
    )
  ) {
    updateAdvancedFilters(filteredRecipes, selectedTags, handleAddTag);
  }
}

// Supprimer un tag et mettre à jour les filtres lorsqu'un tag est désélectionné
function handleRemoveTag(tagText, tagElement, selector) {
  selectedTags = removeTag(
    tagText,
    tagElement,
    selector,
    selectedTags,
    tagContainerUnified,
    (text, sel) => addOptionToDropdown(text, sel, handleAddTag),
    updateFilters
  );
  updateAdvancedFilters(filteredRecipes, selectedTags, handleAddTag);
  updateFilters();
}

//----------------------- ECOUTEURS D'EVENEMENTS -----------------------------------

// Écouteur d'événements pour la saisie dans la barre de recherche et filtrage des recettes en fonction de la requête de recherche
searchBar.addEventListener("input", (event) => {
  currentInputValue = event.target.value.trim(); // Supprimer les espaces superflus

  // Mettre à jour les filtres uniquement si la requête n'est pas juste composée d'espaces ou vide
  if (
    currentInputValue.length === 0 ||
    (event.inputType === "insertText" && event.data === " ")
  ) {
    return; // Ne rien faire si la requête n'est composée que d'espaces
  }

  updateFilters(); // Réappliquer à la fois le filtrage par recherche et par tags
});

ingredientSearchInput.addEventListener("input", () => {
  const query = ingredientSearchInput.value.trim().toLowerCase(); // Valeur de recherche en minuscule
  console.log("Query :", query);

  // Filtrer les recettes contenant le query
  const updatedRecipes = filteredRecipes.filter((recipe) =>
    recipe.ingredients.some((ing) =>
      ing.ingredient.toLowerCase().includes(query)
    )
  );

  // Extraire les ingrédients uniques (normalisés pour comparaison)
  const filteredIngredients = Array.from(
    updatedRecipes
      .flatMap(
        (recipe) =>
          recipe.ingredients
            .map((ing) => ing.ingredient) // Obtenir les noms originaux
            .filter((ingredient) => ingredient.toLowerCase().includes(query)) // Filtrer par le query
      )
      .reduce((uniqueMap, ingredient) => {
        const normalizedIngredient = ingredient.toLowerCase(); // Normaliser pour comparaison
        if (!uniqueMap.has(normalizedIngredient)) {
          uniqueMap.set(normalizedIngredient, ingredient); // Conserver l'original
        }
        return uniqueMap;
      }, new Map()) // Utiliser une Map pour préserver l'ordre
      .values()
  );

  // Affichage des résultats uniques
  console.log("Ingrédients filtrés :", filteredIngredients);

  // Mettre à jour les options du menu déroulant
  updateFilterOptions(
    ".ingredient-options",
    filteredIngredients,
    selectedTags,
    handleAddTag
  );
});

// Écouteur d'événements pour la saisie dans le champ de recherche des appareils et filtrage des options du menu déroulant
// Filtrage pour les appareils
applianceSearchInput.addEventListener("input", () => {
  const query = applianceSearchInput.value.trim().toLowerCase(); // Valeur de recherche en minuscule
  console.log("Query appareils :", query);

  // Filtrer les recettes contenant le query pour les appareils
  const updatedRecipes = filteredRecipes.filter(
    (recipe) => recipe.appliance.toLowerCase().includes(query) // Vérification si la chaîne contient le query
  );

  // Extraire les appareils uniques (normalisés pour comparaison)
  const filteredAppliances = Array.from(
    updatedRecipes
      .flatMap((recipe) => recipe.appliance) // Obtenir les appareils
      .filter((appliance) => appliance.toLowerCase().includes(query)) // Filtrer par le query
      .reduce((uniqueMap, appliance) => {
        const normalizedAppliance = appliance.toLowerCase(); // Normaliser pour comparaison
        if (!uniqueMap.has(normalizedAppliance)) {
          uniqueMap.set(normalizedAppliance, appliance); // Conserver l'original
        }
        return uniqueMap;
      }, new Map()) // Utiliser une Map pour préserver l'ordre
      .values()
  );

  // Affichage des résultats uniques
  console.log("Appareils filtrés :", filteredAppliances);

  // Mettre à jour les options du menu déroulant pour les appareils
  updateFilterOptions(
    ".appliance-options",
    filteredAppliances,
    selectedTags,
    handleAddTag
  );
});

// Filtrage pour les ustensiles
ustensilSearchInput.addEventListener("input", () => {
  const query = ustensilSearchInput.value.trim().toLowerCase(); // Valeur de recherche en minuscule
  console.log("Query ustensiles :", query);

  // Filtrer les recettes contenant le query pour les ustensiles
  const updatedRecipes = filteredRecipes.filter((recipe) =>
    recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(query))
  );

  // Extraire les ustensiles uniques (normalisés pour comparaison)
  const filteredUstensils = Array.from(
    updatedRecipes
      .flatMap((recipe) => recipe.ustensils) // Obtenir les ustensiles
      .filter((ustensil) => ustensil.toLowerCase().includes(query)) // Filtrer par le query
      .reduce((uniqueMap, ustensil) => {
        const normalizedUstensil = ustensil.toLowerCase(); // Normaliser pour comparaison
        if (!uniqueMap.has(normalizedUstensil)) {
          uniqueMap.set(normalizedUstensil, ustensil); // Conserver l'original
        }
        return uniqueMap;
      }, new Map()) // Utiliser une Map pour préserver l'ordre
      .values()
  );

  // Affichage des résultats uniques
  console.log("Ustensiles filtrés :", filteredUstensils);

  // Mettre à jour les options du menu déroulant pour les ustensiles
  updateFilterOptions(
    ".ustensil-options",
    filteredUstensils,
    selectedTags,
    handleAddTag
  );
});

//--------------------------------INITIALISATION---------------------------------------------

// Initialiser les cards avec toutes les recettes au chargement de la page
// updateCards(recipes, recipesContainer, recipeCardFactory);
// updateAdvancedFilters(recipes, selectedTags, handleAddTag);
updateFilters();
