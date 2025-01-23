// Classe pour créer des cartes de recette dynamiquement
class RecipeCardFactory {
  createRecipeCard(recipe) {
    // Créer un nouvel élément div pour chaque carte de recette
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("col-sm-12", "col-md-6", "col-lg-4", "mb-4");

    // Remplir la carte de recette avec les détails de la recette (image, titre, description, ingrédients)
    recipeCard.innerHTML = `
              <div class="card recipe-card">
                  <img src="./assets/Img_recipes/${
                    recipe.image
                  }" class="card-img-top" alt="${recipe.name} loading="lazy"">
                  <p class="card-time">${recipe.time} min</p>
                  <div class="card-body">
                      <h5 class="card-title">${recipe.name}</h5>
                      <p class="card-recipes">RECETTE</p>
                      <p class="card-text">${recipe.description}</p>
                      <div class="ingredients-section">
                          <h6 class="ingredients-title">INGRÉDIENTS</h6>
                          <div class="ingredients-grid">
                              ${recipe.ingredients
                                .map(
                                  (ing) => `
                                  <div class="ingredient-item">
                                      <span class="ingredient-name">${
                                        ing.ingredient
                                      }</span>
                                      <span class="ingredient-quantity">${
                                        ing.quantity
                                          ? `${ing.quantity} ${ing.unit || ""}`
                                          : ""
                                      }</span>
                                  </div>`
                                )
                                .join("")}
                          </div>
                      </div>
                   </div>
              </div>
          `;

    return recipeCard; // Retourner la carte de recette générée
  }
}

export default RecipeCardFactory;
