export function filterDropdownOptions(
  inputElement,
  selector,
  options,
  updateFilterOptions
) {
  const searchValue = inputElement.value.toLowerCase(); // Récupère la valeur de recherche et la met en minuscules

  // Mettre toutes les options en minuscules dès le départ et les ajouter à un Set pour garantir l'unicité
  const uniqueOption = new Set(options.map((option) => option.toLowerCase()));

  // Filtrer les éléments uniques en fonction de la valeur de recherche
  const filteredOptions = Array.from(uniqueOption).filter(
    (option) => option.includes(searchValue) // Vérifie si l'élément contient la valeur recherchée
  );

  // updateFilterOptions(selector, MajOption); // Mettre à jour les options du menu déroulant
  updateFilterOptions(selector, filteredOptions);
}
