// Function to add a tag to the selected tags array and update the UI
export function addTag(
  tagText,
  selector,
  selectedTags,
  tagContainerUnified,
  removeTagCallback,
  updateFiltersCallback
) {
  if (!selectedTags.includes(tagText)) {
    selectedTags.push(tagText); // Add tag to the selected tags array
    console.log("selectedTags", selectedTags);

    const tagElement = document.createElement("div");
    tagElement.classList.add("tag");
    tagElement.innerHTML = `<span>${tagText}</span><button>x</button>`; // Add the tag text and a remove button

    // Add event listener to the remove button
    tagElement
      .querySelector("button")
      .addEventListener("click", () =>
        removeTagCallback(tagText, tagElement, selector)
      );

    tagContainerUnified.appendChild(tagElement); // Append the tag to the tag container
    removeOptionFromDropdown(tagText, selector); // Remove the selected tag from the dropdown options
    updateFiltersCallback(); // Update filters based on the new selection
    return true; // Tag added
  }
  return false; // Tag already exists
}

// Function to remove a tag and update the UI
export function removeTag(
  tagText,
  tagElement,
  selector,
  selectedTags,
  tagContainerUnified,
  addOptionToDropdownCallback,
  updateFiltersCallback
) {
  selectedTags = selectedTags.filter((tag) => tag !== tagText); // Remove the tag from the selected tags array
  tagContainerUnified.removeChild(tagElement); // Remove the tag from the tag container

  addOptionToDropdownCallback(tagText, selector); // Re-add the option to the dropdown
  updateFiltersCallback(); // Update filters based on the removal
  return selectedTags; // Return updated selectedTags
}

// Function to remove an option from the dropdown after selecting it as a tag
export function removeOptionFromDropdown(tagText, selector) {
  const dropdownContainer = document.querySelector(selector); // Get dropdown container by selector
  const options = Array.from(dropdownContainer.children); // Get all dropdown options

  // Find the option matching the selected tag text
  const optionToRemove = options.find(
    (option) => option.textContent.trim() === tagText.trim()
  );
  if (optionToRemove) {
    dropdownContainer.removeChild(optionToRemove); // Remove the option from the dropdown
  }
}

// Function to re-add an option to the dropdown after removing the tag
export function addOptionToDropdown(tagText, selector, addTagCallback) {
  const dropdownContainer = document.querySelector(selector);
  const option = document.createElement("li");
  option.textContent = tagText;
  option.classList.add("dropdown-item");
  option.addEventListener("click", () => addTagCallback(tagText, selector));

  dropdownContainer.appendChild(option);
}
