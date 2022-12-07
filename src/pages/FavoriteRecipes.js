import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { updateRoute } from '../redux/actions/actions';

class FavoriteRecipes extends React.Component {
  state = {
    pathname: '/favorite-recipes',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { pathname } = this.state;
    dispatch(updateRoute(pathname));
  }

  render() {
    const { history } = this.props;
    return (
      <Header
        history={ history }
      />
    );
  }
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default connect()(FavoriteRecipes);
