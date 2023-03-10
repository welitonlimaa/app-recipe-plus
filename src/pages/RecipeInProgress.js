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
    isFav: false,
    idRecipe: '',
  };

  componentDidMount() {
    const { history, dispatch } = this.props;
    const { pathname } = history.location;
    const id = pathname.split('/');
    dispatch(fetchRecipeById(id[2], id[1]));
    this.setState({ type: id[1], route: pathname, idRecipe: id[2] });
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgress === null || inProgress === undefined) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: {},
        meals: {},
      }));
    } else if (inProgress[id[1]][id[2]]) {
      this.handleDisabled(inProgress[id[1]][id[2]]);
    }

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes === null || doneRecipes === undefined) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favoriteRecipes.length !== 0) {
      const status = favoriteRecipes.some((recipe) => recipe.id === id[2]);

      this.setState({ isFav: status });
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

  doneRecipe = (data) => {
    const options = {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
    };
    const newDate = new Date();
    const date = newDate.toLocaleDateString('pt-br', options);
    const { id,
      type,
      category,
      name,
      alcoholicOrNot,
      image,
      strTags,
      nationality } = data;

    const tags = strTags === undefined || strTags === null ? [] : strTags.split(',');

    const obj = {
      id,
      nationality,
      name,
      category,
      type,
      image,
      tags,
      alcoholicOrNot,
      doneDate: date,
    };
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, obj]));
  };

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

  favRecipe = () => {
    const { isFav } = this.state;
    this.setState({ isFav: !isFav });
  };

  render() {
    const { recipe, history } = this.props;
    const { route, isDisabled, isFav, type, idRecipe } = this.state;

    const dataRecipe = this.variablePattern();

    return (
      <div className="container-fluid">
        <div className="fixed-top details-header">
          <div className="details-subheader">
            <div>
              <ShareButton datatestid="share-btn" type={ type } idRecipe={ idRecipe } />
              <FavButton
                datatestid="favorite-btn"
                dataRecipe={ dataRecipe }
                isFav={ isFav }
                favRecipe={ this.favRecipe }
              />
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
          <IngredientsCheckbox
            history={ history }
            handleDisabled={ this.handleDisabled }
          />
          <h2 className="fw-bold">Instructions</h2>
          <div className="infos">
            <p data-testid="instructions">{recipe.strInstructions}</p>
          </div>
        </div>
        <Link
          to="/done-recipes"
          className="footer text-center fixed-bottom
        container-button p-4"
        >
          <button
            type="button"
            className="btn btn-primary btn-lg"
            id="finish-button"
            data-testid="finish-recipe-btn"
            disabled={ isDisabled }
            onClick={ () => this.doneRecipe(dataRecipe) }
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
