import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Meals extends React.Component {
  render() {
    return (
      <h1>Meals</h1>
    );
  }
}

// Recipes.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

export default connect()(Meals);
