import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import FavButton from '../components/FavButton';
import { updateRoute } from '../redux/actions/actions';

class FavoriteRecipes extends React.Component {
  state = {
    favoriteRecipes: JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
    pathname: '/favorite-recipes',
    isEmpty: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { pathname } = this.state;
    dispatch(updateRoute(pathname));
  }

  filterBy = (type) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favoriteRecipes.length !== 0) {
      if (type !== 'all') {
        const newData = favoriteRecipes.filter((data) => data.type === type);
        this.setState({ favoriteRecipes: newData });
      } else {
        this.setState({ favoriteRecipes });
      }
    }
  };

  updateFavs = (newFavs) => {
    this.setState({ favoriteRecipes: newFavs });
  };

  render() {
    const { history } = this.props;
    const { isEmpty, favoriteRecipes } = this.state;
    const isFav = true;
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
              {favoriteRecipes.map((recipes, index) => (
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
                      <h4 data-testid={ `${index}-horizontal-name` }>{recipes.name}</h4>
                    </Link>

                    <p data-testid={ `${index}-horizontal-top-text` }>
                      { `${recipes.nationality} - ${recipes.category}` }
                    </p>

                    <ShareButton
                      datatestid={ `${index}-horizontal-share-btn` }
                      type={ `${recipes.type}s` }
                      idRecipe={ recipes.id }
                    />

                    <FavButton
                      datatestid={ `${index}-horizontal-favorite-btn` }
                      dataRecipe={ favoriteRecipes }
                      isFav={ isFav }
                      idRecipe={ recipes.id }
                      favRecipe={ this.updateFavs }
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

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default connect()(FavoriteRecipes);
