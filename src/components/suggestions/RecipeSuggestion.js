import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import MealSuggestionCard from './MealSuggestionCard';
import DrinkSuggestionCard from './DrinkSuggestionCard';
import '../../style/recipeSuggestion.css';
import { fetchSuggest } from '../../redux/actions/actions';

class RecipeSuggestion extends Component {
  state = {
    mealsSuggestionArray: [],
    drinksSuggestionArray: [],
  };

  componentDidMount() {
    this.initProps();
  }

  initProps = async () => {
    const { dispatch } = this.props;
    await dispatch(fetchSuggest());
    const { mealsSuggestionArray, drinksSuggestionArray } = this.props;
    this.setState({
      mealsSuggestionArray,
      drinksSuggestionArray,
    });
  };

  saveMealsSuggestionArray = () => {
    // pega o array de sugestão de comidas e faz uma lista dele

    const { mealsSuggestionArray } = this.state;
    const maxSuggestion = 6;
    const randomArray = mealsSuggestionArray
      .filter((recipe, index) => (index < maxSuggestion));
    // console.log(randomArray);
    return randomArray;
  };

  saveDrinksSuggestionArray = () => {
    // pega o array de sugestão de comidas e faz uma lista dele

    const { drinksSuggestionArray } = this.state;
    const maxSuggestion = 6;
    const randomArray = drinksSuggestionArray
      .filter((recipe, index) => (index < maxSuggestion));
    return randomArray;
  };

  render() {
    // const { mealsSuggestionArray, drinksSuggestionArray } = this.state;
    const { route } = this.props;
    return (
      <div>
        <h2>Recommended</h2>
        <div className="carrousel">
          {route.split('/')[1] === 'drinks' ? (
            this.saveMealsSuggestionArray().map((recipe, index) => (
              <MealSuggestionCard
                dataMeal={ recipe }
                id={ index }
                key={ recipe.idMeal }
                // className="content-recipe"
              />
            ))
          ) : (
            this.saveDrinksSuggestionArray().map((recipe, index) => (
              <DrinkSuggestionCard
                dataDrink={ recipe }
                id={ index }
                key={ recipe.idDrink }
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

RecipeSuggestion.propTypes = {
  dispatch: PropTypes.func.isRequired,
  drinksSuggestionArray: PropTypes.arrayOf().isRequired,
  mealsSuggestionArray: PropTypes.arrayOf().isRequired,
  route: PropTypes.string.isRequired,
};

const mapStateToProps = ({ recipeReducer, allRecipesReducer }) => ({
  mealsSuggestionArray: recipeReducer.mealsSuggest,
  drinksSuggestionArray: recipeReducer.drinksSuggest,
  route: allRecipesReducer.history,
});

export default connect(mapStateToProps)(RecipeSuggestion);
