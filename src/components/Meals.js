import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Meals extends React.Component {
  render() {
    return (
      <h1>M</h1>
    );
  }
}

// Recipes.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

export default connect()(Meals);
