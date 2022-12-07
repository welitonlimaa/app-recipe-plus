import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPIs } from '../redux/actions/actions';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

class Recipes extends React.Component {
  state = {
    route: '/meals',
    redirected: true,
  };

  componentDidMount() {
    const { dispatch, history } = this.props;
    const { redirected } = this.state;
    dispatch(fetchAPIs());
    const { pathname } = history.location;
    dispatch(fetchAPIs(pathname));
    this.setState({ route: pathname, redirected: !redirected });
  }

  changeRoute = (route) => {
    const { history } = this.props;
    history.push(route);
    window.location.reload(false);
  };

  render() {
    const { loading, history } = this.props;
    if (loading) {
      return <Loading />;
    }

    const { route } = this.state;
    return (
      <div>
        { (route === ('/meals') || ('/drinks')) && <Header history={ history } /> }
        { route === '/meals' ? <Meals
          redirectForRecipe={ this.changeRoute }
        /> : null}
        { route === '/drinks' ? <Drinks
          redirectForRecipe={ this.changeRoute }
        /> : null}
        { (route === ('/meals') || ('/drinks')) && <Footer
          changeRoute={ this.changeRoute }
        /> }
      </div>
    );
  }
}

Recipes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.allRecipesReducer.isLoading,
});

export default connect(mapStateToProps)(Recipes);
