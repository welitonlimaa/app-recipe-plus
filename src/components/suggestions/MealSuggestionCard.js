import PropTypes from 'prop-types';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class MealSuggestionCard extends Component {
  render() {
    const { dataMeal, id } = this.props;
    const { strMealThumb, strMeal, idMeal } = dataMeal;
    return (
      <Link to={ `/meals/${idMeal}` }>
        <div className="recipe-card" data-testid={ `${id}-recommendation-card` }>
          <img src={ strMealThumb } alt={ strMeal } data-testid={ `${id}-card-img` } />
          <p data-testid={ `${id}-recommendation-title` }>{strMeal}</p>
        </div>
      </Link>
    );
  }
}

MealSuggestionCard.propTypes = {
  dataMeal: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
};

export default MealSuggestionCard;
