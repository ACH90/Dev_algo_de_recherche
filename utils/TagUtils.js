// Fonction pour ajouter un tag au tableau des tags sélectionnés et mettre à jour l'interface utilisateur
export function addTag(
  tagText,
  selector,
  selectedTags,
  tagContainerUnified,
  removeTagCallback,
  updateFiltersCallback
) {
  if (!selectedTags.includes(tagText)) {
    selectedTags.push(tagText); // Ajouter le tag au tableau des tags sélectionnés

    const tagElement = document.createElement("div");
    tagElement.classList.add("tag");
    tagElement.innerHTML = `<span>${tagText}</span><button>x</button>`; // Ajouter le texte du tag et un bouton pour supprimer

    // Ajouter un écouteur d'événements au bouton de suppression
    tagElement
      .querySelector("button")
      .addEventListener("click", () =>
        removeTagCallback(tagText, tagElement, selector)
      );

    tagContainerUnified.appendChild(tagElement); // Ajouter le tag au conteneur des tags
    removeOptionFromDropdown(tagText, selector); // Retirer le tag sélectionné des options du menu déroulant
    updateFiltersCallback(); // Mettre à jour les filtres en fonction de la nouvelle sélection
    return true; // Tag ajouté
  }
  return false; // Le tag existe déjà
}

// Fonction pour supprimer un tag et mettre à jour l'interface utilisateur
export function removeTag(
  tagText,
  tagElement,
  selector,
  selectedTags,
  tagContainerUnified,
  addOptionToDropdownCallback,
  updateFiltersCallback
) {
  selectedTags = selectedTags.filter((tag) => tag !== tagText); // Retirer le tag du tableau des tags sélectionnés
  tagContainerUnified.removeChild(tagElement); // Retirer le tag du conteneur des tags

  addOptionToDropdownCallback(tagText, selector); // Ré-ajouter l'option au menu déroulant
  updateFiltersCallback(); // Mettre à jour les filtres en fonction de la suppression
  return selectedTags; // Retourner les tags sélectionnés mis à jour
}

// Fonction pour retirer une option du menu déroulant après l'avoir sélectionnée comme tag
export function removeOptionFromDropdown(tagText, selector) {
  const dropdownContainer = document.querySelector(selector); // Obtenir le conteneur du menu déroulant par le sélecteur
  const options = Array.from(dropdownContainer.children); // Obtenir toutes les options du menu déroulant

  // Trouver l'option correspondant au texte du tag sélectionné
  const optionToRemove = options.find(
    (option) => option.textContent.trim() === tagText.trim()
  );
  if (optionToRemove) {
    dropdownContainer.removeChild(optionToRemove); // Retirer l'option du menu déroulant
  }
}

// Fonction pour ré-ajouter une option au menu déroulant après la suppression du tag
export function addOptionToDropdown(tagText, selector, addTagCallback) {
  const dropdownContainer = document.querySelector(selector);
  const option = document.createElement("li");
  option.textContent = tagText;
  option.classList.add("dropdown-item");
  option.addEventListener("click", () => addTagCallback(tagText, selector));

  dropdownContainer.appendChild(option);
}

//-------------------------------------------------------------------------------------------------

// Fonction pour ajouter un tag sélectionné à selectedTags
export function handleAddTag(tag, selector) {
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
