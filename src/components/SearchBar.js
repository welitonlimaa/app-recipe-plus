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
      <form className="search-container text-center">
        <input
          type="text"
          className="form-control"
          data-testid="search-input"
          name="searchInput"
          onChange={ this.handleChange }
        />
        <div className="form-check form-check-inline">
          <label
            htmlFor="ingredient"
            className="form-check-label"
          >
            <input
              type="radio"
              className="form-check-input"
              value="ingredient"
              id="ingredient"
              name="searchRadio"
              data-testid="ingredient-search-radio"
              onChange={ this.handleChange }
            />
            Ingrediente
          </label>
        </div>
        <div className="form-check form-check-inline">
          <label
            htmlFor="Name"
            className="form-check-label"
          >
            <input
              type="radio"
              className="form-check-input"
              value="name"
              id="Name"
              name="searchRadio"
              data-testid="name-search-radio"
              onChange={ this.handleChange }
            />
            Nome
          </label>
        </div>
        <div className="form-check form-check-inline">
          <label
            htmlFor="First letter"
            className="form-check-label"
          >
            <input
              type="radio"
              className="form-check-input"
              value="First letter"
              id="First letter"
              name="searchRadio"
              data-testid="first-letter-search-radio"
              onChange={ this.handleChange }
            />
            Primeira Letra
          </label>

        </div>
        <button
          type="button"
          className="btn btn-secondary"
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
