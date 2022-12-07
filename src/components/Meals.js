import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchMealCategory, fetchResetDB } from '../redux/actions/actions';
import RecipeMealCard from './RecipeMealCard';
import RecipeNotFound from './RecipeNotFound';

class Meals extends React.Component {
  state = {
    actualCategory: 'All',
  };

  getAllMeals = (category) => {
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
      this.getAllMeals('All');
    } else {
      dispatch(fetchMealCategory(category));
    }
  };

  render() {
    const { dataMeals, categorys, redirectForRecipe } = this.props;

    if (dataMeals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters');
      return <RecipeNotFound />;
    }

    if (dataMeals.length === 1) {
      const id = dataMeals[0].idMeal;
      const route = `/meals/${id}`;
      redirectForRecipe(route);
    }

    return (
      <div>
        <h1>Meals</h1>
        <div>
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => this.getAllMeals('All') }
          >
            All
          </button>
          {
            categorys.map((category, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ `${category}-category-filter` }
                onClick={ () => this.getByCategory(category) }
              >
                {category}
                {' '}
              </button>
            ))
          }
        </div>
        <div>
          { dataMeals.map((meal, index) => (
            <RecipeMealCard
              key={ index }
              id={ index }
              dataMeal={ meal }
            />
          )) }
        </div>
      </div>
    );
  }
}

Meals.propTypes = {
  dataMeals: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  categorys: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  redirectForRecipe: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dataMeals: state.allRecipesReducer.mealDB,
  categorys: state.allRecipesReducer.categorysMeal,
});

export default connect(mapStateToProps)(Meals);
