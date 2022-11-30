import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
// import PropTypes from 'prop-types';

class Meals extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h1>Meals</h1>
      </>
    );
  }
}

// Recipes.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

export default connect()(Meals);
