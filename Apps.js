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
// import { filterAndMapRecipes } from "./filterAndMapRecipes.jsx";

//----------------------------

let InputValue = ""; // recherche actuelle
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
const utensilSearchInput = document.querySelector(".utensil-search-input");
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
  if (InputValue.length === 0) {
    filteredRecipes = filteredByTags; // Afficher toutes les recettes filtrées par tags
  } else {
    // Appliquer la requête de recherche aux recettes filtrées par tags
    filteredRecipes = searchRecipes(InputValue.trim(), filteredByTags);
  }

  // Si aucune recette n'est trouvée, afficher un message d'erreur
  if (filteredRecipes.length === 0) {
    errorContainer.innerHTML = "Aucune recette ne correspond à la recherche";
  } else {
    errorContainer.innerHTML = "";
  }

  // Mettre à jour l'UI avec les recettes filtrées
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

// Écouteur d'événements pour la saisie dans la barre de recherche et filtrage des recettes en fonction de la requête de recherche
searchBar.addEventListener("input", (event) => {
  InputValue = event.target.value.trim(); // Supprimer les espaces superflus

  // Mettre à jour les filtres uniquement si la requête n'est pas juste composée d'espaces ou vide
  if (
    InputValue.length === 0 ||
    (event.inputType === "insertText" && event.data === " ")
  ) {
    updateFilters();
    return; // Ne rien faire si la requête n'est composée que d'espaces
  }

  updateFilters(); // Réappliquer à la fois le filtrage par recherche et par tags
});

// Écouteur d'événements pour la saisie dans le champ de recherche des ingrédients et filtrage des options du menu déroulant
ingredientSearchInput.addEventListener("input", () => {
  filterDropdownOptions(
    ingredientSearchInput,
    ".ingredient-options",
    Array.from(
      filteredRecipes.flatMap((r) => r.ingredients.map((ing) => ing.ingredient))
    ),
    (selector, items) =>
      updateFilterOptions(selector, items, selectedTags, handleAddTag)
  );
});

// Écouteur d'événements pour la saisie dans le champ de recherche des appareils et filtrage des options du menu déroulant
applianceSearchInput.addEventListener("input", () => {
  filterDropdownOptions(
    applianceSearchInput,
    ".appliance-options",
    Array.from(filteredRecipes.map((r) => r.appliance)),
    (selector, items) =>
      updateFilterOptions(selector, items, selectedTags, handleAddTag)
  );
});

// Écouteur d'événements pour la saisie dans le champ de recherche des ustensiles et filtrage des options du menu déroulant
utensilSearchInput.addEventListener("input", () => {
  filterDropdownOptions(
    utensilSearchInput,
    ".utensil-options",
    Array.from(filteredRecipes.flatMap((r) => r.ustensils)),
    (selector, items) =>
      updateFilterOptions(selector, items, selectedTags, handleAddTag)
  );
});

// Initialiser les cards avec toutes les recettes au chargement de la page
updateCards(recipes, recipesContainer, recipeCardFactory);
updateAdvancedFilters(recipes, selectedTags, handleAddTag);
