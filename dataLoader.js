import recipes from "./data/recipes.js";

let filteredRecipes;
function loadData() {
  filteredRecipes = [...recipes]; // Par défaut, toutes les recettes sont affichées
  return filteredRecipes;
}

export { filteredRecipes, loadData };
