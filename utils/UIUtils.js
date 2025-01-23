// Fonction pour mettre à jour l'interface utilisateur avec les recettes filtrées
export function updateCards(
  recipesToShow,
  recipesContainer,
  recipeCardFactory
) {
  recipesContainer.innerHTML = "";

  // Parcourir chaque recette et créer une carte en utilisant la RecipeCardFactory
  recipesToShow.forEach((recipe) => {
    const recipeCard = recipeCardFactory.createRecipeCard(recipe); // Créer une nouvelle carte de recette
    recipesContainer.appendChild(recipeCard); // Ajouter la carte de recette au conteneur
  });
}

// Fonction pour mettre à jour le nombre de recettes affichées
export function updateRecipeCount(count, recipesCountElement) {
  // Mettre à jour le contenu textuel pour afficher le nombre de recettes trouvées
  recipesCountElement.textContent = `${count} recettes`;
}
