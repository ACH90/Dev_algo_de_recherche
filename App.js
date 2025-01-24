import { filterAndMapRecipes } from "./filterAndMapRecipes.js";
import recipes from "./data/recipes.js";
import RecipeCardFactory from "./utils/RecipeCardFactory.js";
import { updateRecipeCount } from "./utils/UIUtils.js";
import { updateAdvancedFilters } from "./utils/FilterUtils.js";
import { handleAddTag } from "./utils/TagUtils.js";
import { handleDropdownOption } from "./utils/Dropdown.js";
import { handleIngredientFilter } from "./utils/FilterUtils.js";

// Variables globales pour stocker les filtres
let inputValue = "";
let selectedIngredient = "";
let selectedAppliance = "";
let selectedUstensils = "";

// Initialiser selectedTags comme un tableau vide
let selectedTags = [];

// Sélection des éléments du DOM
const searchBar = document.querySelector(".search-bar");
const ingredientFilter = document.querySelector(".ingredient-search-input");
const applianceFilter = document.querySelector(".appliance-search-input");
const ustensilFilter = document.querySelector(".utensil-search-input");
const recipesContainer = document.querySelector(".recipes-container");
const recipesCount = document.querySelector(".recipe-count-number");
const ingredients = new Set(); // Set pour stocker les ingrédients uniques
const appliances = new Set(); // Set pour stocker les appareils uniques
const utensils = new Set(); // Set pour stocker les ustensiles uniques

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

console.log("Voici les recettes filtrées", filteredRecipes);
console.log("Voici les tags selectionnes", selectedTags);
console.log("Voici l'ingrédient selectionne", selectedIngredient);
console.log("Voici l'appareil selectionne", selectedAppliance);
console.log("Voici les ustensiles selectionnes", selectedUstensils);

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
  //   filteredRecipes.forEach((recipe) => {
  //     const recipeCard = recipeCardFactory.createRecipeCard(recipe); // Génère la carte avec la factory
  //     recipesContainer.appendChild(recipeCard); // Ajoute la carte générée au conteneur
  //   });

  // Génère les cartes de recettes filtrées avec la factory et map
  const recipeCards = filteredRecipes.map((recipe) => {
    return recipeCardFactory.createRecipeCard(recipe); // Retourne un élément DOM
  });

  // Parcourir chaque recette et extraire ses ingrédients, appareils et ustensiles
  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => ingredients.add(ing.ingredient));
    appliances.add(recipe.appliance);
    recipe.ustensils.forEach((ust) => utensils.add(ust));
  });

  console.log("Voici les recettes filtéres dans App", filteredRecipes);
  console.log("Voici les ingredients dans App", ingredients);
  console.log("Voici les appareils dans App", appliances);
  console.log("Voici les ustensiles dans App", utensils);

  // Une fois le tableau d'éléments généré, on les ajoute tous au conteneur
  recipeCards.forEach((card) => recipesContainer.appendChild(card));

  updateRecipeCount(filteredRecipes.length, recipesCount);
  // Met à jour les filtres avancés
  updateAdvancedFilters(filteredRecipes, selectedTags, handleAddTag);

  //   updateFilterOptions(selector, items, selectedTags, addTagCallback);
  document
    .querySelector(".ingredient-search-input")
    .addEventListener("input", (event) => {
      const value = event.target.value.toLowerCase();
      console.log("Valeur entrée :", value);
      handleIngredientFilter(value);
    });
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

ingredientFilter.addEventListener("input", (e) => {
  selectedIngredient = e.target.value.trim().toLowerCase();
  updateRecipesDisplay();
});

// Chargement initial des recettes
updateRecipesDisplay();

//Chargement initial des filtres avancés
updateAdvancedFilters(filteredRecipes, selectedTags, handleAddTag);
