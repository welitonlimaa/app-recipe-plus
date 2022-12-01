import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDrinkCategory, fetchResetDB } from '../redux/actions/dataApiActions';
import RecipeDrinkCard from './RecipeDrinkCard';

class Drinks extends React.Component {
  state = {
    actualCategory: 'All',
  };

  getAllDrinks = (category) => {
    this.setState({
      actualCategory: category,
    });
    const { dispatch } = this.props;
    dispatch(fetchResetDB());
  };

  getByCategory = (category) => {
    const { dispatch } = this.props;
    const { actualCategory } = this.state;

    this.setState({ actualCategory: category });

    if (category === actualCategory) {
      this.getAllDrinks('All');
    } else {
      dispatch(fetchDrinkCategory(category));
    }
  };

  render() {
    const { dataDrinks, categorys } = this.props;

    return (
      <div>
        <h1>Drinks</h1>
        <div>
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => this.getAllDrinks('All') }
          >
            All
          </button>
          {
            categorys.map((category, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ `${category}-category-filter` }
                onClick={ () => this.getByCategory(category) }
              >
                {category}
                {' '}
              </button>
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dataDrinks: state.dataApiReducer.drinkDB,
  categorys: state.dataApiReducer.categorysDrink,
});

export default connect(mapStateToProps)(Drinks);
