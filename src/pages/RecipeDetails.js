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
    recipeStatus: false,
    isFav: false,
    isDone: false,
    idRecipe: '',
  };

  componentDidMount() {
    const { dispatch, history } = this.props;
    const { pathname } = history.location;
    const id = pathname.split('/');
    dispatch(fetchRecipeById(id[2], id[1]));
    dispatch(fetchSuggest());
    this.setState({ type: id[1], route: pathname, idRecipe: id[2] });
    dispatch(updateRoute(pathname));
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    if (inProgress[id[1]] !== undefined) {
      const recipeStatus = inProgress[id[1]][id[2]];
      const status = recipeStatus !== undefined;
      this.setState({ recipeStatus: status });
    }
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favoriteRecipes.length !== 0) {
      const status = favoriteRecipes.some((recipe) => recipe.id === id[2]);

      this.setState({ isFav: status });
    }
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    if (doneRecipe.length !== 0) {
      const status = doneRecipe.some((recipe) => recipe.id === id[2]);

      this.setState({ isDone: status });
      console.log(status);
    }
  }

  // parametriza os nomes das variáveis de acordo o tipo se drink ou meal
  variablePattern = () => {
    const { type } = this.state;
    const { recipe } = this.props;
    let data = {};
    if (type.includes('drinks')) {
      const { idDrink: id, strCategory: category, strDrink: name,
        strAlcoholic: alcoholicOrNot, strDrinkThumb: image, strTags } = recipe;
      data = {
        id,
        type: 'drink',
        category,
        name,
        alcoholicOrNot,
        image,
        strTags,
        nationality: '' };
    } else {
      const { idMeal: id, strCategory: category, strMeal: name,
        strMealThumb: image, strTags, strArea } = recipe;
      data = {
        id,
        type: 'meal',
        category,
        name,
        alcoholicOrNot: '',
        image,
        strTags,
        nationality: strArea };
    }
    return data;
  };

  changeRoute = () => {
    const { route } = this.state;
    const url = `${route}/in-progress`;
    const { history } = this.props;
    history.push(url);
  };

  favRecipe = () => {
    const { isFav } = this.state;
    this.setState({ isFav: !isFav });
  };

  render() {
    const { loading, recipe, history } = this.props;
    const { route, recipeStatus, isFav, isDone, type, idRecipe } = this.state;
    if (loading) {
      return <Loading />;
    }

    const dataRecipe = this.variablePattern();

    return (
      <div>
        <ShareButton type={ type } idRecipe={ idRecipe } />
        <FavButton
          dataRecipe={ dataRecipe }
          isFav={ isFav }
          favRecipe={ this.favRecipe }
        />
        <h1 data-testid="recipe-title">{dataRecipe.name}</h1>
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
        {
          isDone ? ''
            : (
              <button
                type="button"
                className="startbtn"
                data-testid="start-recipe-btn"
                onClick={ this.changeRoute }
              >
                { recipeStatus ? 'Continue Recipe' : 'Start Recipe'}
              </button>
            )
        }

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
