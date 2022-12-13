import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Footer extends React.Component {
  render() {
    const { changeRoute } = this.props;
    return (
      <footer
        className="footer fixed-bottom p-2"
        data-testid="footer"
      >
        <div className="d-flex justify-content-between flex-wrap">
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
        </div>
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
