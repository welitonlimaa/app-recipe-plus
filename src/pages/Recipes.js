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
  };

  componentDidMount() {
    const { dispatch, history } = this.props;
    const { pathname } = history.location;
    dispatch(fetchAPIs(pathname));
    this.setState({ route: pathname });
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
      <div className="container-fluid">
        { (route === ('/meals') || ('/drinks')) && <Header history={ history } /> }
        <div className="content">
          { route === '/meals' ? <Meals
            redirectForRecipe={ this.changeRoute }
          /> : null}
          { route === '/drinks' ? <Drinks
            redirectForRecipe={ this.changeRoute }
          /> : null}
        </div>
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
