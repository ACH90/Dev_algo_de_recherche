//fonction pour mettre en minuscule, supprimer les doublons et mettre la premiere lettre en majuscule pour
// chaque options

export function filterDropdownOptions(inputElement, selector, items) {
  const searchValue = inputElement.value.toLowerCase();
  const uniqueItems = new Set();

  // Normalize items to lowercase and add to Set for uniqueness
  items.forEach((item) => {
    uniqueItems.add(item.toLowerCase());
  });

  // Filter the unique items based on the search input
  const filteredItems = Array.from(uniqueItems).filter((item) =>
    item.includes(searchValue)
  );

  // Capitalize only the first letter of each item
  const capitalizedItems = filteredItems.map(
    (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
  );
}
