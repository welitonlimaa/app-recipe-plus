import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class IngredientsList extends React.Component {
  returnIngredientsList = () => {
    const { recipe } = this.props;
    const ingredients = Object.keys(recipe)
      .filter((key) => key.includes('strIngredient') && recipe[key])
      .map((ingredient, index) => (
        `${recipe[ingredient]} ${recipe[`strMeasure${index + 1}`]}`));

    return (
      <ul>
        {ingredients.map((ingred, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingred}
          </li>
        ))}
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

IngredientsList.propTypes = {
  history: PropTypes.any,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  recipe: state.recipeReducer.recipe,
});

export default connect(mapStateToProps)(IngredientsList);
