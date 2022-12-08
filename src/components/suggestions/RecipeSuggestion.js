import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import MealSuggestionCard from './MealSuggestionCard';
import DrinkSuggestionCard from './DrinkSuggestionCard';
import '../../style/recipeSuggestion.css';

class RecipeSuggestion extends Component {
  state = {
    mealsSuggestionArray: [],
    drinksSuggestionArray: [],
  };

  componentDidMount() {
    this.setState({
      mealsSuggestionArray: this.saveMealsSuggestionArray(),
      drinksSuggestionArray: this.saveDrinksSuggestionArray(),
    });
  }

  saveMealsSuggestionArray = () => {
    // pega o array de sugestão de comidas e faz uma lista dele

    const { mealsSuggestionArray } = this.props;
    const maxSuggestion = 6;

    const randomInt = Math
      .floor(Math.random() * (mealsSuggestionArray.length - maxSuggestion));
    const randomArray = mealsSuggestionArray
      .filter((recipe, index) => (index >= randomInt))
      .filter((recipe, index) => (index < maxSuggestion));
    console.log(randomArray);
    return randomArray;
  };

  saveDrinksSuggestionArray = () => {
    // pega o array de sugestão de comidas e faz uma lista dele

    const { drinksSuggestionArray } = this.props;
    const maxSuggestion = 6;

    const randomInt = Math
      .floor(Math.random() * (drinksSuggestionArray.length - maxSuggestion));
    const randomArray = drinksSuggestionArray
      .filter((recipe, index) => (index >= randomInt))
      .filter((recipe, index) => (index < maxSuggestion));
    console.log(randomArray);
    return randomArray;
  };

  render() {
    const { mealsSuggestionArray, drinksSuggestionArray } = this.state;
    const { route } = this.props;
    return (
      <>
        <span>Sugestão de receitas</span>
        <div className="carrousel">
          {route === '/meals' ? (
            mealsSuggestionArray.map((recipe) => (
              <MealSuggestionCard
                dataMeal={ recipe }
                id={ recipe.idMeal }
                key={ recipe.idMeal }
                className="content-recipe"
              />
            ))
          ) : (
            drinksSuggestionArray.map((recipe) => (
              <DrinkSuggestionCard
                dataDrink={ recipe }
                id={ recipe.idDrink }
                key={ recipe.idDrink }
                className="content-recipe"
              />
            ))
          )}
        </div>
      </>
    );
  }
}

RecipeSuggestion.propTypes = {
  mealsSuggestionArray: PropTypes.arrayOf.isRequired,
  drinksSuggestionArray: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = ({ recipeReducer, allRecipesReducer }) => ({
  mealsSuggestionArray: recipeReducer.mealsSuggest,
  drinksSuggestionArray: recipeReducer.drinksSuggest,
  route: allRecipesReducer.history,
});

export default connect(mapStateToProps)(RecipeSuggestion);
