import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { updateRoute } from '../redux/actions/actions';

class Profile extends React.Component {
  state = {
    pathname: '/profile',
    user: (JSON.parse(localStorage.getItem('user'))).email,
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
    const { user } = this.state;
    return (
      <>
        <Header
          history={ history }
        />
        <h1>Profile</h1>
        <h3 data-testid="profile-email">{user}</h3>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('done-recipes') }
        >
          Done Recipes

        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('favorite-recipes') }
        >
          Favorite Recipes

        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Logout

        </button>
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
