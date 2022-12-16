import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import { updateRoute } from '../redux/actions/actions';

class DoneRecipes extends React.Component {
  state = {
    pathname: '/done-recipes',
    isEmpty: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { pathname } = this.state;
    dispatch(updateRoute(pathname));
  }

  render() {
    const { history } = this.props;
    const { isEmpty } = this.state;
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    return (
      <div>
        {!isEmpty ? (
          <div>
            <Header history={ history } />

            <button data-testid="filter-by-all-btn" type="button">
              All
            </button>

            <button data-testid="filter-by-meal-btn" type="button">
              Meals
            </button>

            <button data-testid="filter-by-drink-btn" type="button">
              Drinks
            </button>
            {doneRecipe.map((recipes, index) => (
              <div key={ index }>
                <Link to={ `/${recipes.type}s/${recipes.id}` }>
                  <img
                    width="100px"
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipes.image }
                    alt={ recipes.name }
                  />
                </Link>
                <Link to={ `/${recipes.type}s/${recipes.id}` }>
                  <h4 data-testid={ `${index}-horizontal-name` }>{recipes.name}</h4>
                </Link>

                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`categoria: ${recipes.category}`}
                </p>

                <p data-testid={ `${index}-horizontal-done-date` }>
                  {`Feito em: ${recipes.doneDate}`}
                </p>

                {recipes.tags.length > 0 ? (
                  recipes.tags.map((tag) => (
                    <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                      {`Tipo: ${tag}`}
                    </p>
                  ))
                ) : ''}
                <ShareButton
                  datatestid={ `${index}-horizontal-share-btn` }
                  type={ `${recipes.type}s` }
                  idRecipe={ recipes.id }
                />
              </div>
            ))}
          </div>
        ) : (
          <Header history={ history } />
        )}
      </div>
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default connect()(DoneRecipes);
