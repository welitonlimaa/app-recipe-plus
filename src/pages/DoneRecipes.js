import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { updateRoute } from '../redux/actions/actions';
import shareIcon from '../style/images/Share.png';
import allmeals from '../style/images/foods.png';
import alldrinks from '../style/images/bebidas.png';
import alltypes from '../style/images/alltypes.png';

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
      <div className="text-center">
        {!isEmpty ? (
          <div className="pb-5">
            <Header history={ history } />
            <div className="d-flex justify-content-center flex-wrap mt-4">
              <button
                data-testid="filter-by-all-btn"
                type="button"
                className="d-flex flex-column align-items-center btn-categorys"
              >
                <img
                  src={ alltypes }
                  alt="all types"
                />
                All
              </button>

              <button
                data-testid="filter-by-meal-btn"
                type="button"
                className="d-flex flex-column align-items-center btn-categorys"
              >
                <img
                  src={ allmeals }
                  alt="meals"
                />
                Meals
              </button>

              <button
                data-testid="filter-by-drink-btn"
                type="button"
                className="d-flex flex-column align-items-center btn-categorys"
              >
                <img
                  src={ alldrinks }
                  alt="drinks"
                />
                Drinks
              </button>
            </div>
            <div className="d-flex justify-content-around flex-wrap mt-4">
              {doneRecipe.map((recipes, index) => (
                <div key={ index } className="done-card">
                  <img
                    className="img-done"
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipes.image }
                    alt={ recipes.name }
                  />
                  <div className="infos-donerecipes">
                    <p
                      data-testid={ `${index}-horizontal-name` }
                      className="fw-bold"
                    >
                      {recipes.name}

                    </p>

                    <p data-testid={ `${index}-horizontal-top-text` }>
                      {`Categoria: ${recipes.category}`}
                    </p>

                    <p data-testid={ `${index}-horizontal-done-date` }>
                      {`Feito em: ${recipes.doneDate}`}
                    </p>
                    <p>
                      {recipes.tags.length > 0 ? (
                        recipes.tags.map((tag) => (
                          <span
                            key={ tag }
                            data-testid={ `${index}-${tag}-horizontal-tag` }

                          >
                            {`Tipo: ${tag}  `}
                          </span>
                        ))
                      ) : ''}
                    </p>
                    <button type="button">
                      <img
                        data-testid={ `${index}-horizontal-share-btn` }
                        src={ shareIcon }
                        alt="compartilhar"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
