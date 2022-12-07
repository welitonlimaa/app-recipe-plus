import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { updateRoute } from '../redux/actions/actions';

class Profile extends React.Component {
  state = {
    pathname: '/profile',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { pathname } = this.state;
    dispatch(updateRoute(pathname));
  }

  changeRoute = (route) => {
    const { history } = this.props;
    history.push(route);
  };

  render() {
    const { history } = this.props;
    return (
      <>
        <Header
          history={ history }
        />
        <Footer changeRoute={ this.changeRoute } />
      </>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default connect()(Profile);
