import PropTypes from 'prop-types';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../style/recipeSuggestion.css';

class MealSuggestionCard extends Component {
  render() {
    const { dataMeal, id } = this.props;
    const { strMealThumb, strMeal, idMeal } = dataMeal;
    return (
      <Link to={ `/meals/${idMeal}` }>
        <div
          data-testid={ `${id}-recommendation-card` }
          className="recipe-card text-center"
        >
          <img
            src={ strMealThumb }
            alt={ strMeal }
            data-testid={ `${id}-card-img` }
          />
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
