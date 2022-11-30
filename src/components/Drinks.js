import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RecipeDrinkCard from './RecipeDrinkCard';

class Drinks extends React.Component {
  render() {
    const { dataDrinks } = this.props;

    const num = 12;
    const reduceArray = dataDrinks.slice(0, num);
    return (
      <div>
        <h1>Drinks</h1>
        { reduceArray.map((meal, index) => (
          <RecipeDrinkCard
            key={ index }
            id={ index }
            dataDrink={ meal }
          />
        )) }
      </div>
    );
  }
}

Drinks.propTypes = {
  dataDrinks: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

const mapStateToProps = (state) => ({
  dataDrinks: state.dataApiReducer.drinkDB,
});

export default connect(mapStateToProps)(Drinks);
