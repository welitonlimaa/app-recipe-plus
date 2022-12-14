import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { updateRoute } from '../redux/actions/actions';
import done from '../style/images/done.png';
import logout from '../style/images/Logout.png';

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
    const user = JSON.parse(localStorage.getItem('user')) || '';
    return (
      <div className="text-center">
        <Header
          history={ history }
        />
        <h4 className="fw-bold">{user.email}</h4>
        <div className="d-flex flex-column menu">
          <Link to="/done-recipes">
            <img
              src={ done }
              alt="link to done recipes"
            />
          </Link>
          <Link to="/">
            <img
              src={ logout }
              alt="logout"
            />
          </Link>
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
