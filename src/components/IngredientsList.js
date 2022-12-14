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
      <div className="text-sm-left infos">
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
      </div>
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
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  recipe: state.recipeReducer.recipe,
});

export default connect(mapStateToProps)(IngredientsList);
