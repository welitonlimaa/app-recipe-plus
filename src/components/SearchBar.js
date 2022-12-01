import { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <form>
        <input type="text" />
        <br />
        <fieldset>
          <label htmlFor="ingredient">
            <input
              type="radio"
              value="ingredient"
              id="ingredient"
              name="Search"
              data-testid="ingredient-search-radio"
            />
            Ingrediente
          </label>
          <label htmlFor="Name">
            <input
              type="radio"
              value="Name"
              id="Name"
              name="Search"
              data-testid="name-search-radio"
            />
            Nome
          </label>
          <label htmlFor="First letter">
            <input
              type="radio"
              value="First letter"
              id="First letter"
              name="Search"
              data-testid="first-letter-search-radio"
            />
            Primeira Letra
          </label>
        </fieldset>
        <button
          type="button"
          data-testid="exec-search-btn"
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

export default SearchBar;
