import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecipeById } from '../redux/actions/actions';
import ShareButton from '../components/ShareButton';
import FavButton from '../components/FavButton';
import IngredientsCheckbox from '../components/IngredientsCheckbox';

class RecipeInProgress extends React.Component {
  state = {
    type: '',
    route: '',
  };

  componentDidMount() {
    const { history, dispatch } = this.props;
    const { pathname } = history.location;
    const id = pathname.split('/');
    dispatch(fetchRecipeById(id[2], id[1]));
    this.setState({ type: id[1], route: pathname });
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // console.log(inProgress);
    if (inProgress === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: {},
        meals: {},
      }));
    }
  }

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
    const { route } = this.state;
    // console.log(type);
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
        <IngredientsCheckbox history={ history } />
        <section>
          <h3>Instruções</h3>
          <p data-testid="instructions">{recipe.strInstructions}</p>
        </section>
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finish Recipe
        </button>

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
