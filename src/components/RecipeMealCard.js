import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class RecipeMealCard extends React.Component {
  render() {
    const { dataMeal, id } = this.props;
    const { strMealThumb, strMeal, idMeal } = dataMeal;
    return (
      <div className="recipe-card" data-testid={ `${id}-recipe-card` }>
        <Link to={ `/meals/${idMeal}` }>
          <img src={ strMealThumb } alt={ strMeal } data-testid={ `${id}-card-img` } />
          <p data-testid={ `${id}-card-name` }>{strMeal}</p>
        </Link>
      </div>
    );
  }
}

RecipeMealCard.propTypes = {
  dataMeal: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
};

export default RecipeMealCard;
