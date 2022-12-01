import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class RecipeMealCard extends React.Component {
  render() {
    const { dataMeal, id } = this.props;
    const { strMealThumb, strMeal, idMeal } = dataMeal;
    return (
      <Link to={ `/meals/${idMeal}` }>
        <div className="recipe-card" data-testid={ `${id}-recipe-card` }>
          <img src={ strMealThumb } alt={ strMeal } data-testid={ `${id}-card-img` } />
          <p data-testid={ `${id}-card-name` }>{strMeal}</p>
        </div>
      </Link>
    );
  }
}

RecipeMealCard.propTypes = {
  dataMeal: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
};

export default RecipeMealCard;
