import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { updateRoute } from '../redux/actions/actions';
import doneimg from '../style/images/doneimg.png';
import iconFavRecipes from '../style/images/favrecipes.png';
import logout from '../style/images/logout.png';

class Profile extends React.Component {
  state = {
    pathname: '/profile',
    user: 'email@email.com',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { pathname } = this.state;
    dispatch(updateRoute(pathname));
    if ((JSON.parse(localStorage.getItem('user'))) !== null) {
      const user = (JSON.parse(localStorage.getItem('user'))).email;
      this.setState({
        user,
      });
    }
  }

  changeRoute = (route) => {
    const { history } = this.props;
    history.push(route);
  };

  render() {
    const { history } = this.props;
    const { user } = this.state;
    return (
      <div className="text-center">
        <Header
          history={ history }
        />
        <h3
          data-testid="profile-email"
          className="fw-bold"
        >
          {user}
        </h3>
        <div className="d-flex flex-column menu">
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('done-recipes') }
          >
            <img
              src={ doneimg }
              alt="done recipes"
            />
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('favorite-recipes') }
          >
            <img
              src={ iconFavRecipes }
              alt="favorites recipes"
            />
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => {
              // localStorage.clear();
              history.push('/');
            } }
          >
            <img
              src={ logout }
              alt="logout"
            />
            Logout
          </button>
        </div>
        <Footer changeRoute={ this.changeRoute } />
      </div>
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
