import { filterAndMapRecipes } from "./filterAndMapRecipes.js";
import recipes from "./data/recipes.js";
import RecipeCardFactory from "./utils/RecipeCardFactory.js";

// Variables globales pour stocker les filtres
let inputValue = "";
let selectedIngredient = "";
let selectedAppliance = "";
let selectedUstensils = "";

// Sélection des éléments du DOM
const searchBar = document.querySelector(".search-bar");
const ingredientFilter = document.querySelector(".ingredient-search-input");
const applianceFilter = document.querySelector(".appliance-search-input");
const ustensilFilter = document.querySelector(".utensil-search-input");
const recipesContainer = document.querySelector(".recipes-container");

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

  // Génère les cartes de recettes filtrées en utilisant la RecipeCardFactory
  filteredRecipes.forEach((recipe) => {
    const recipeCard = recipeCardFactory.createRecipeCard(recipe); // Génère la carte avec la factory
    recipesContainer.appendChild(recipeCard); // Ajoute la carte générée au conteneur
  });
};

// Écouteurs d'événements pour déclencher le filtrage
searchBar.addEventListener("input", (e) => {
  inputValue = e.target.value.trim().toLowerCase();
  updateRecipesDisplay();
});

ingredientFilter.addEventListener("input", (e) => {
  selectedIngredient = e.target.value.trim().toLowerCase();
  updateRecipesDisplay();
});

applianceFilter.addEventListener("input", (e) => {
  selectedAppliance = e.target.value.trim().toLowerCase();
  updateRecipesDisplay();
});

ustensilFilter.addEventListener("input", (e) => {
  selectedUstensils = e.target.value.trim().toLowerCase();
  updateRecipesDisplay();
});

// Chargement initial des recettes
updateRecipesDisplay();
