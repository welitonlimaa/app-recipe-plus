import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import RecipeMealCard from './RecipeMealCard';

class Meals extends React.Component {
  render() {
    const { dataMeals, categorys } = this.props;

    return (
      <div>
        <h1>Meals</h1>
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
          { dataMeals.map((meal, index) => (
            <RecipeMealCard
              key={ index }
              id={ index }
              dataMeal={ meal }
            />
          )) }
        </div>
      </div>
    );
  }
}

Meals.propTypes = {
  dataMeals: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  categorys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  dataMeals: state.dataApiReducer.mealDB,
  categorys: state.dataApiReducer.categorysMeal,
});

export default connect(mapStateToProps)(Meals);
