import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchMealCategory, fetchResetDB } from '../redux/actions/actions';
import RecipeMealCard from './RecipeMealCard';
import RecipeNotFound from './RecipeNotFound';
import allmeals from '../style/images/allmeals.png';
import beef from '../style/images/beef.png';
import breakFast from '../style/images/breakfast.png';
import chicken from '../style/images/chicken.png';
import dessert from '../style/images/dessert.png';
import goat from '../style/images/goat.png';

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
    const { actualCategory } = this.state;

    if (dataMeals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return <RecipeNotFound />;
    }

    if (dataMeals.length === 1 && actualCategory !== 'Goat') {
      const id = dataMeals[0].idMeal;
      const route = `/meals/${id}`;
      redirectForRecipe(route);
    }

    const imgCategorys = [beef, breakFast, chicken, dessert, goat];

    return (
      <div className="text-center">
        <div className="d-flex justify-content-center flex-wrap mt-4">
          <button
            type="button"
            className="d-flex flex-column align-items-center btn-categorys"
            data-testid="All-category-filter"
            onClick={ () => this.getAllMeals('All') }
          >
            <img
              src={ allmeals }
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
