import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/recipeSuggestion.css';

class DrinkSuggestionCard extends React.Component {
  render() {
    const { dataDrink, id } = this.props;
    const { strDrinkThumb, strDrink, idDrink } = dataDrink;
    return (
      <Link to={ `/drinks/${idDrink}` }>
        <div
          data-testid={ `${id}-recommendation-card` }
          className="content-recipe"
        >
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
            data-testid={ `${id}-card-img` }
          />
          <p data-testid={ `${id}-recommendation-title` }>{strDrink}</p>
        </div>
      </Link>
    );
  }
}

DrinkSuggestionCard.propTypes = {
  dataDrink: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
};

export default DrinkSuggestionCard;
