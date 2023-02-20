import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import { updateRoute } from '../redux/actions/actions';

class DoneRecipes extends React.Component {
  state = {
    doneRecipes: JSON.parse(localStorage.getItem('doneRecipes')) || [],
    pathname: '/done-recipes',
    isEmpty: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { pathname } = this.state;
    dispatch(updateRoute(pathname));
  }

  filterBy = (type) => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    if (doneRecipes.length !== 0) {
      if (type !== 'all') {
        const newData = doneRecipes.filter((data) => data.type === type);
        this.setState({ doneRecipes: newData });
      } else {
        this.setState({ doneRecipes });
      }
    }
  };

  render() {
    const { history } = this.props;
    const { isEmpty, doneRecipes } = this.state;

    return (
      <div className="text-center">
        {!isEmpty ? (
          <div className="pb-5">
            <Header history={ history } />
            <div className="d-flex justify-content-center flex-wrap mt-4">
              <button
                data-testid="filter-by-all-btn"
                type="button"
                onClick={ () => this.filterBy('all') }
                className="d-flex flex-column align-items-center btn-categorys"
              >
                All
              </button>

              <button
                data-testid="filter-by-meal-btn"
                type="button"
                onClick={ () => this.filterBy('meal') }
                className="d-flex flex-column align-items-center btn-categorys"
              >
                Meals
              </button>

              <button
                data-testid="filter-by-drink-btn"
                type="button"
                onClick={ () => this.filterBy('drink') }
                className="d-flex flex-column align-items-center btn-categorys"
              >
                Drinks
              </button>
            </div>
            <div className="d-flex justify-content-around flex-wrap mt-4">
              {doneRecipes.map((recipes, index) => (
                <div key={ index } className="done-card">
                  <Link to={ `/${recipes.type}s/${recipes.id}` }>
                    <img
                      className="img-donecard"
                      data-testid={ `${index}-horizontal-image` }
                      src={ recipes.image }
                      alt={ recipes.name }
                    />
                  </Link>
                  <div className="infos-donerecipes">
                    <Link to={ `/${recipes.type}s/${recipes.id}` }>
                      <h4
                        data-testid={ `${index}-horizontal-name` }
                        className="fw-bold"
                      >
                        {recipes.name}
                      </h4>
                    </Link>

                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { `${recipes.nationality} - ${recipes.category}` }
                    </p>

                    <p data-testid={ `${index}-horizontal-done-date` }>
                      {`Feito em: ${recipes.doneDate}`}
                    </p>

                    {recipes.tags.length > 0 ? (
                      recipes.tags.map((tag) => (
                        <span
                          key={ tag }
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                        >
                          {`Tipo: ${tag}`}
                        </span>
                      ))
                    ) : ''}
                    <ShareButton
                      datatestid={ `${index}-horizontal-share-btn` }
                      type={ `${recipes.type}s` }
                      idRecipe={ recipes.id }
                    />
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
