import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class RecipeDrinkCard extends React.Component {
  render() {
    const { dataDrink, id } = this.props;
    const { strDrinkThumb, strDrink, idDrink } = dataDrink;
    return (
      <div className="recipe-card" data-testid={ `${id}-recipe-card` }>
        <Link to={ `/drinks/${idDrink}` }>
          <img src={ strDrinkThumb } alt={ strDrink } data-testid={ `${id}-card-img` } />
          <p
            className="h5"
            data-testid={ `${id}-card-name` }
          >
            {strDrink}

          </p>
        </Link>
      </div>
    );
  }
}

RecipeDrinkCard.propTypes = {
  dataDrink: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
};

export default RecipeDrinkCard;
