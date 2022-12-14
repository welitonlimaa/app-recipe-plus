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
      const { idDrink: id, strCategory: category, strDrink: name,
        strAlcoholic: alcoholicOrNot, strDrinkThumb: image, strTags } = recipe;
      data = { id,
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
      data = { id,
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

  render() {
    const { loading, recipe, history } = this.props;
    const { route } = this.state;
    if (loading) {
      return <Loading />;
    }

    const url = recipe.strYoutube !== undefined
      ? recipe.strYoutube.split('watch?v=') : '';
    const dataRecipe = this.variablePattern();

    return (
      <div className="container-fluid">
        <div className="fixed-top details-header">
          <div className="details-subheader">
            <div>
              <ShareButton />
              <FavButton />
            </div>
            <h1 data-testid="recipe-title">{dataRecipe.name}</h1>
          </div>
          <img
            src={ route.includes('meals') ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt="Foto da receita"
            width="300px"
            height="300px"
            data-testid="recipe-photo"
          />
        </div>
        <div className="container details-content">
          { route.includes('drinks')
            ? <h3 data-testid="recipe-category">{ recipe.strAlcoholic }</h3>
            : <h3 data-testid="recipe-category">{recipe.strCategory}</h3> }
          <h2 className="fw-bold">Ingredients</h2>
          <IngredientsList history={ history } />
          <h2 className="fw-bold">Instructions</h2>
          <div className="infos">
            <p data-testid="instructions">{recipe.strInstructions}</p>
          </div>
          <div className="text-center video-container">
            {
              history.location.pathname.includes('meals')
              && <iframe
                data-testid="video"
                src={ `https://www.youtube.com/embed/${url[1]}` }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay;
             clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            }
          </div>
          <RecipeSuggestion />
        </div>
        <div className="footer text-center fixed-bottom container-button p-4">
          <button
            type="button"
            className="startbtn btn btn-primary btn-lg"
            data-testid="start-recipe-btn"
            onClick={ this.changeRoute }
          >
            Start Recipe
          </button>
        </div>
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
