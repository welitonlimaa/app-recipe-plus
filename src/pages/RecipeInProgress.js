import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRecipeById } from '../redux/actions/actions';
import ShareButton from '../components/ShareButton';
import FavButton from '../components/FavButton';
import IngredientsCheckbox from '../components/IngredientsCheckbox';

class RecipeInProgress extends React.Component {
  state = {
    type: '',
    route: '',
    isDisabled: true,
  };

  componentDidMount() {
    const { history, dispatch } = this.props;
    const { pathname } = history.location;
    const id = pathname.split('/');
    dispatch(fetchRecipeById(id[2], id[1]));
    this.setState({ type: id[1], route: pathname });
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgress === null || inProgress === undefined) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: {},
        meals: {},
      }));
    } else {
      this.handleDisabled(inProgress[id[1]][id[2]]);
    }
  }

  handleDisabled = (ingredientsCheckded) => {
    const { recipe } = this.props;
    const ingredients = Object.keys(recipe)
      .filter((key) => key.includes('strIngredient') && recipe[key])
      .map((ingredient, index) => (
        `${recipe[ingredient]} ${recipe[`strMeasure${index + 1}`]}`));

    if (ingredientsCheckded.length === ingredients.length) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  variablePattern = () => {
    const { type } = this.state;
    const { recipe } = this.props;
    let data = {};
    if (type.includes('drink')) {
      const { strDrink: title } = recipe;
      data = { title };
    } else {
      const { strMeal: title } = recipe;
      data = { title };
    }
    return data;
  };

  render() {
    const { recipe, history } = this.props;
    const { route, isDisabled } = this.state;

    const dataRecipe = this.variablePattern();

    return (
      <div>
        <ShareButton />
        <FavButton />
        <h1 data-testid="recipe-title">{dataRecipe.title}</h1>
        <img
          src={ route.includes('meals') ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt="Foto da receita"
          width="300px"
          height="300px"
          data-testid="recipe-photo"
        />
        { route.includes('drinks')
          ? <h3 data-testid="recipe-category">{ recipe.strAlcoholic }</h3>
          : <h3 data-testid="recipe-category">{recipe.strCategory}</h3> }
        <IngredientsCheckbox history={ history } handleDisabled={ this.handleDisabled } />
        <section>
          <h3>Instruções</h3>
          <p data-testid="instructions">{recipe.strInstructions}</p>
        </section>
        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ isDisabled }
          >
            Finish Recipe
          </button>
        </Link>
      </div>
    );
  }
}

RecipeInProgress.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  recipe: state.recipeReducer.recipe,
  loading: state.allRecipesReducer.isLoading,
});

export default connect(mapStateToProps)(RecipeInProgress);
