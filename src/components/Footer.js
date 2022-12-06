import React from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Footer extends React.Component {
  redirectBtn = () => (
    <Switch>
      <Route exact path="/" component={ <Redirect to="/drinks" /> } />
    </Switch>

  );

  render() {
    return (
      <footer data-testid="footer">
        <Link to="/meals">
          <img
            data-testid="meals-bottom-btn"
            src={ mealIcon }
            alt="Comidas"
          />
        </Link>
        <button type="button" onClick={ this.redirectBtn }>
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
}.isRequired;

export default connect()(Footer);
