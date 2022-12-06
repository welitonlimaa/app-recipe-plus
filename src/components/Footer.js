import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Footer extends React.Component {
  render() {
    const { changeRoute } = this.props;
    return (
      <footer data-testid="footer">
        <button
          type="button"
          onClick={ () => changeRoute('/meals') }
        >
          <img
            data-testid="meals-bottom-btn"
            src={ mealIcon }
            alt="Comidas"
          />
        </button>
        <button
          type="button"
          onClick={ () => changeRoute('/drinks') }
        >
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="Bebidas"
          />
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
  changeRoute: PropTypes.func.isRequired,
}.isRequired;

export default connect()(Footer);
