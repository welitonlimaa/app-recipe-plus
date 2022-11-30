import PropTypes from 'prop-types';
import React from 'react';

class RecipeMealCard extends React.Component {
  render() {
    const { dataMeal, id } = this.props;
    const { strMealThumb, strMeal } = dataMeal;
    return (
      <div className="recipe-card" data-testid={ `${id}-recipe-card` }>
        <img src={ strMealThumb } alt={ strMeal } data-testid={ `${id}-card-img` } />
        <p data-testid={ `${id}-card-name` }>{strMeal}</p>
      </div>
    );
  }
}

RecipeMealCard.propTypes = {
  dataMeal: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
};

export default RecipeMealCard;
