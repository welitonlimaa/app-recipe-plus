import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSearchItems } from '../redux/actions/actions';

class SearchBar extends Component {
  state = {
    searchInput: '',
    searchRadio: 'ingredient',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { actualRoute, dispatch } = this.props;
    const { searchInput, searchRadio } = this.state;
    if (searchRadio === 'First letter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      dispatch(fetchSearchItems(actualRoute, { searchInput, searchRadio }));
    }
  };

  render() {
    return (
      <form>
        <input
          type="text"
          data-testid="search-input"
          name="searchInput"
          onChange={ this.handleChange }
        />
        <br />
        <fieldset>
          <label htmlFor="ingredient">
            <input
              type="radio"
              value="ingredient"
              id="ingredient"
              name="searchRadio"
              data-testid="ingredient-search-radio"
              onChange={ this.handleChange }
            />
            Ingrediente
          </label>
          <label htmlFor="Name">
            <input
              type="radio"
              value="name"
              id="Name"
              name="searchRadio"
              data-testid="name-search-radio"
              onChange={ this.handleChange }
            />
            Nome
          </label>
          <label htmlFor="First letter">
            <input
              type="radio"
              value="First letter"
              id="First letter"
              name="searchRadio"
              data-testid="first-letter-search-radio"
              onChange={ this.handleChange }
            />
            Primeira Letra
          </label>
        </fieldset>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ allRecipesReducer }) => ({
  actualRoute: allRecipesReducer.history,
});

SearchBar.propTypes = {
  actualRoute: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(SearchBar);
