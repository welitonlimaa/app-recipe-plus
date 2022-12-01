import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RecipeDrinkCard from './RecipeDrinkCard';

class Drinks extends React.Component {
  render() {
    const { dataDrinks, categorys } = this.props;

    return (
      <div>
        <h1>Drinks</h1>
        <div>
          {
            categorys.map((category, index) => (
              <span
                key={ index }
                data-testid={ `${category}-category-filter` }
              >
                {category}
                {' '}
              </span>
            ))
          }
        </div>
        <div>
          { dataDrinks.map((meal, index) => (
            <RecipeDrinkCard
              key={ index }
              id={ index }
              dataDrink={ meal }
            />
          )) }
        </div>
      </div>
    );
  }
}

Drinks.propTypes = {
  dataDrinks: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  categorys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  dataDrinks: state.dataApiReducer.drinkDB,
  categorys: state.dataApiReducer.categorysDrink,
});

export default connect(mapStateToProps)(Drinks);
