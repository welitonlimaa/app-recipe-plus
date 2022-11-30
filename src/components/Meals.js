import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import RecipeMealCard from './RecipeMealCard';

class Meals extends React.Component {
  render() {
    const { dataMeals } = this.props;

    const num = 12;
    const reduceArray = dataMeals.slice(0, num);

    return (
      <div>
        <h1>Meals</h1>
        { reduceArray.map((meal, index) => (
          <RecipeMealCard
            key={ index }
            id={ index }
            dataMeal={ meal }
          />
        )) }
      </div>
    );
  }
}

Meals.propTypes = {
  dataMeals: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

const mapStateToProps = (state) => ({
  dataMeals: state.dataApiReducer.mealDB,
});

export default connect(mapStateToProps)(Meals);
