import React from 'react';
import { connect } from 'react-redux';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Footer extends React.Component {
  render() {
    return (
      <footer data-testid="footer">
        <button
          type="button"
        >
          <img
            data-testid="meals-bottom-btn"
            src={ mealIcon }
            alt="Comidas"
          />
        </button>
        <button
          type="button"
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

export default connect()(Footer);
