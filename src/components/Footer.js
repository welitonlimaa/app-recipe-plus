import React from 'react';
import { connect } from 'react-redux';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <h1>footer</h1>
      </footer>
    );
  }
}

export default connect()(Footer);
