import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class IngredientsCheckbox extends React.Component {
  state = {
    ingredientsCheckded: [],
    type: '',
    idRecipe: '',
  };

  componentDidMount() {
    const { history } = this.props;
    const { pathname } = history.location;
    const id = pathname.split('/');
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredientsCheckded = inProgress[id[1]][id[2]] ? inProgress[id[1]][id[2]] : [];
    this.setState({ ingredientsCheckded, type: id[1], idRecipe: id[2] });
  }

  checkIngredient = (ingred) => {
    const { ingredientsCheckded, type, idRecipe } = this.state;
    const status = ingredientsCheckded.length !== 0
      ? ingredientsCheckded.some((value) => value === ingred) : null;
    console.log(status);
    if (status === false || status === null) {
      const newCheckdeds = [...ingredientsCheckded, ingred];
      this.setState({ ingredientsCheckded: newCheckdeds });
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        [type]: { [idRecipe]: newCheckdeds },
      }));
    }

    if (status) {
      const newCheckdeds = ingredientsCheckded.filter((value) => value !== ingred);
      this.setState({ ingredientsCheckded: newCheckdeds });
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        [type]: { [idRecipe]: newCheckdeds },
      }));
    }
  };

  isChecked = (ingred) => {
    const { ingredientsCheckded } = this.state;
    const status = ingredientsCheckded.length !== 0
      ? ingredientsCheckded.some((value) => value === ingred) : null;
    if (status) {
      return status;
    }
    return status;
  };

  returnIngredientsList = () => {
    const { recipe } = this.props;

    const ingredients = Object.keys(recipe)
      .filter((key) => key.includes('strIngredient') && recipe[key])
      .map((ingredient, index) => (
        `${recipe[ingredient]} ${recipe[`strMeasure${index + 1}`]}`));

    return (
      <ul>
        {ingredients.map((ingred, index) => {
          const status = this.isChecked(ingred);
          return (
            <li key={ index }>
              <label
                htmlFor={ `ingrediente-${index}` }
                data-testid={ `${index}-ingredient-step` }
                className={ status ? 'ingred-checkded' : null }
              >
                <input
                  type="checkbox"
                  id={ `ingrediente-${index}` }
                  onClick={ () => this.checkIngredient(ingred) }
                  defaultChecked={ status }
                />
                {ingred}
              </label>
            </li>
          );
        })}
      </ul>
    );
  };

  render() {
    const { recipe } = this.props;
    return (
      <section>
        {recipe && this.returnIngredientsList()}
      </section>
    );
  }
}

IngredientsCheckbox.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  recipe: state.recipeReducer.recipe,
});

export default connect(mapStateToProps)(IngredientsCheckbox);
