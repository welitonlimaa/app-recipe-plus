import PropTypes from 'prop-types';
import React from 'react';

class RecipeDrinkCard extends React.Component {
  render() {
    const { dataDrink, id } = this.props;
    const { strDrinkThumb, strDrink } = dataDrink;
    return (
      <div className="recipe-card" data-testid={ `${id}-recipe-card` }>
        <img src={ strDrinkThumb } alt={ strDrink } data-testid={ `${id}-card-img` } />
        <p data-testid={ `${id}-card-name` }>{strDrink}</p>
      </div>
    );
  }
}

RecipeDrinkCard.propTypes = {
  dataDrink: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
};

export default RecipeDrinkCard;
