/* eslint-disable react/prop-types */

import styles from "./SearchBar.module.css";
import SearchIconButton from "../SearchIconButton/SearchIconButton";

const SearchBar = ({ inputValue, setInputValue }) => {
  // Fonction de gestion du changement dans l'input
  const handleChange = (event) => {
    let value = event.target.value;
    setInputValue(value);
  };

  // Fonction pour effacer le texte de l'input
  const handleClear = () => {
    setInputValue("");
  };

  return (
    <>
      <div className={styles.searchBar}>
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            name="searchBar"
            id="searchBar"
            className={styles.searchInput}
            placeholder="Rechercher une recette, un ingrédient..."
            aria-label="Search"
            value={inputValue} // Lier l'état à la valeur de l'input
            onChange={handleChange} // Utiliser la fonction handleChange pour chaque changement de l'input
          />
          <div className={styles.clearIconContainer}>
            {/* Afficher la croix pour effacer le champ si du texte est entré */}
            {inputValue && (
              <span className={styles.clearIcon} onClick={handleClear}>
                &#x2715; {/* Croix */}
              </span>
            )}
          </div>

          <div className={styles.searchIconButtonContainer}>
            <SearchIconButton />
          </div>
        </div>
      </div>
      <div className="searchResults">
        <div className="searchResult">données</div>
      </div>
    </>
  );
};

export default SearchBar;
