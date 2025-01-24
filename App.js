import { filterAndMapRecipes } from "./filterAndMapRecipes.js";
import recipes from "/data/recipes.js";
import RecipeCardFactory from "./utils/RecipeCardFactory.js";
import { updateRecipeCount } from "./utils/UIUtils.js";
import { updateAdvancedFilters } from "./utils/FilterUtils.js";

// Variables globales pour stocker les filtres
let inputValue = "";
let selectedIngredient = "";
let selectedAppliance = "";
let selectedUstensils = "";

// Initialiser selectedTags comme un tableau vide
let selectedTags = [];

// Fonction pour ajouter un tag sélectionné à selectedTags
function handleAddTag(tag, selector) {
  // Si le tag n'est pas déjà sélectionné, l'ajouter à selectedTags
  if (!selectedTags.includes(tag)) {
    selectedTags.push(tag);
  }

  // Mettre à jour l'affichage des recettes filtrées
  updateRecipesDisplay();

  // Fermer le menu déroulant après la sélection (si nécessaire)
  const dropdown = document.querySelector(selector);
  dropdown.classList.remove("show");
}

// Sélection des éléments du DOM
const searchBar = document.querySelector(".search-bar");
const ingredientFilter = document.querySelector(".ingredient-search-input");
const applianceFilter = document.querySelector(".appliance-search-input");
const ustensilFilter = document.querySelector(".utensil-search-input");
const recipesContainer = document.querySelector(".recipes-container");
const recipesCount = document.querySelector(".recipe-count-number");

// Message d'erreur
const errorContainer = document.createElement("div");
errorContainer.classList.add("no-results-message");
recipesContainer.parentElement.appendChild(errorContainer);

const filteredRecipes = filterAndMapRecipes(
  recipes,
  inputValue,
  selectedIngredient,
  selectedAppliance,
  selectedUstensils
);

// Fonction pour mettre à jour l'affichage des recettes
const updateRecipesDisplay = () => {
  const recipeCardFactory = new RecipeCardFactory(); // Instance de la factory
  const filteredRecipes = filterAndMapRecipes(
    recipes,
    inputValue,
    selectedIngredient,
    selectedAppliance,
    selectedUstensils
  );

  // Efface les recettes existantes
  recipesContainer.innerHTML = "";

  // Vérifie s'il y a des résultats
  if (filteredRecipes.length === 0) {
    recipesContainer.innerHTML = `<p class="no-results-message">Aucune recette ne correspond à votre recherche.</p>`;
    return;
  }

  // Génère les cartes de recettes filtrées
  filteredRecipes.forEach((recipe) => {
    const recipeCard = recipeCardFactory.createRecipeCard(recipe); // Génère la carte avec la factory
    recipesContainer.appendChild(recipeCard); // Ajoute la carte générée au conteneur
  });
  updateRecipeCount(filteredRecipes.length, recipesCount);

  // Met à jour les filtres avancés
  updateAdvancedFilters(filteredRecipes, selectedTags, handleAddTag);
};

// Fonction pour mettre à jour les options de filtre dans le DOM
function updateFilterOptions(selector, filteredOptions) {
  const dropdownContainer = document.querySelector(selector);
  dropdownContainer.innerHTML = ""; // Vider les options existantes

  // Ajouter chaque option filtrée dans le dropdown
  filteredOptions.forEach((option) => {
    const optionElement = document.createElement("li");
    optionElement.textContent = option;
    optionElement.classList.add("dropdown-item");
    dropdownContainer.appendChild(optionElement);
  });
}

// Écouteurs d'événements pour déclencher le filtrage
searchBar.addEventListener("input", (e) => {
  inputValue = e.target.value.trim().toLowerCase();
  updateRecipesDisplay();
});

ingredientFilter.addEventListener("input", (e) =>
  updateFilter(e, "ingredient")
);
applianceFilter.addEventListener("input", (e) => updateFilter(e, "appliance"));
ustensilFilter.addEventListener("input", (e) => updateFilter(e, "ustensil"));

// Chargement initial des recettes
updateRecipesDisplay();

//Chargement initial des filtres avancés
updateAdvancedFilters(filteredRecipes, selectedTags, handleAddTag);
