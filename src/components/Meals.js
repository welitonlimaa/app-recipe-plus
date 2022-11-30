import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import RecipeMealCard from './RecipeMealCard';

class Meals extends React.Component {
  render() {
    const { dataMeals, categorys } = this.props;

    const num = 12;
    const reduceArray = dataMeals.slice(0, num);
    const indexNum = 5;
    const reduceCategorys = categorys.slice(0, indexNum);
    console.log(reduceCategorys);
    return (
      <div>
        <h1>Meals</h1>
        <div>
          {
            reduceCategorys.map((category, index) => (
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
  categorys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  dataMeals: state.dataApiReducer.mealDB,
  categorys: state.dataApiReducer.categorysMeal,
});

export default connect(mapStateToProps)(Meals);
