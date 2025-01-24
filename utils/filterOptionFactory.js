//Classe pour créer des options de filtre dynamiquement

class FilterOptionFactory {
  createFilterOption(option) {
    const optionElement = document.createElement("li");
    optionElement.textContent = option;
    optionElement.classList.add("dropdown-item");
    return optionElement;
  }
}

export default FilterOptionFactory;
