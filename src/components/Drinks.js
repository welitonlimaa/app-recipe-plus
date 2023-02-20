import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDrinkCategory, fetchResetDB } from '../redux/actions/actions';
import RecipeDrinkCard from './RecipeDrinkCard';
import RecipeNotFound from './RecipeNotFound';
import alldrinks from '../style/images/alldrinks.png';
import cocoa from '../style/images/cocoa.png';
import shake from '../style/images/shake.png';
import categorydrink from '../style/images/categorydrink.png';
import other from '../style/images/other.png';
import cocktail from '../style/images/cocktail.png';

class Drinks extends React.Component {
  state = {
    actualCategory: 'All',
  };

  getAllDrinks = (category) => {
    this.setState({
      actualCategory: category,
    });
    const { dispatch } = this.props;
    dispatch(fetchResetDB());
  };

  getByCategory = (category) => {
    const { dispatch } = this.props;
    const { actualCategory } = this.state;

    this.setState({ actualCategory: category });

    if (category === actualCategory) {
      this.getAllDrinks('All');
    } else {
      dispatch(fetchDrinkCategory(category));
    }
  };

  render() {
    const { dataDrinks, categorys, redirectForRecipe } = this.props;

    if (dataDrinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return <RecipeNotFound />;
    }

    if (dataDrinks.length === 1) {
      const id = dataDrinks[0].idDrink;
      const route = `/drinks/${id}`;
      redirectForRecipe(route);
    }

    const imgCategorys = [categorydrink, cocktail, shake, other, cocoa];

    return (
      <div className="text-center">
        <div className="d-flex justify-content-center flex-wrap mt-4">
          <button
            type="button"
            className="d-flex flex-column align-items-center btn-categorys"
            data-testid="All-category-filter"
            onClick={ () => this.getAllDrinks('All') }
          >
            <img
              src={ alldrinks }
              alt="all"
            />
            All
          </button>
          {
            categorys.map((category, index) => (
              <button
                type="button"
                className="d-flex flex-column align-items-center btn-categorys"
                key={ index }
                data-testid={ `${category}-category-filter` }
                onClick={ () => this.getByCategory(category) }
              >
                <img
                  src={ imgCategorys[index] }
                  alt={ category }
                />
                {category}
                {' '}
              </button>
            ))
          }
        </div>
        <div className="d-flex justify-content-around flex-wrap mt-4">
          { dataDrinks.map((meal, index) => (
            <RecipeDrinkCard
              key={ index }
              id={ index }
              dataDrink={ meal }
            />
          )) }
        </div>
      </div>
    );
  }
}

Drinks.propTypes = {
  dataDrinks: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  categorys: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  redirectForRecipe: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dataDrinks: state.allRecipesReducer.drinkDB,
  categorys: state.allRecipesReducer.categorysDrink,
});

export default connect(mapStateToProps)(Drinks);
