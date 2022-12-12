import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecipeById, fetchSuggest, updateRoute } from '../redux/actions/actions';
import Loading from '../components/Loading';
import RecipeSuggestion from '../components/suggestions/RecipeSuggestion';
import IngredientsList from '../components/IngredientsList';
import ShareButton from '../components/ShareButton';
import FavButton from '../components/FavButton';

class RecipeDetails extends React.Component {
  state = {
    type: '',
    route: '',
  };

  componentDidMount() {
    const { dispatch, history } = this.props;
    const { pathname } = history.location;
    const id = pathname.split('s/');
    dispatch(fetchRecipeById(id[1], id[0]));
    dispatch(fetchSuggest());
    this.setState({ type: id[0], route: pathname });
    dispatch(updateRoute(pathname));
  }

  // parametriza os nomes das variáveis de acordo o tipo se drink ou meal
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

  changeRoute = () => {
    const { route } = this.state;
    const url = `${route}/in-progress`;
    const { history } = this.props;
    history.push(url);
  };

  render() {
    const { loading, recipe, history } = this.props;
    const { route } = this.state;
    if (loading) {
      return <Loading />;
    }

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
        <IngredientsList history={ history } />
        <section>
          <h3>Instruções</h3>
          <p data-testid="instructions">{recipe.strInstructions}</p>
        </section>
        {
          history.location.pathname.includes('meals') && <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ recipe.strYoutube }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay;
             clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        }
        <RecipeSuggestion />

        <button
          type="button"
          className="startbtn"
          data-testid="start-recipe-btn"
          onClick={ this.changeRoute }
        >
          Start Recipe
        </button>

      </div>
    );
  }
}

RecipeDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  recipe: state.recipeReducer.recipe,
  loading: state.allRecipesReducer.isLoading,
});

export default connect(mapStateToProps)(RecipeDetails);
