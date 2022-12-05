import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPIs } from '../redux/actions/Actions';
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
    console.log(history);
    dispatch(fetchAPIs());
    const { pathname } = history.location;
    this.setState({ route: pathname });
  }

  render() {
    const { loading } = this.props;

    if (loading) {
      return <Loading />;
    }
    const { route } = this.state;
    const { history } = this.props;
    return (
      <div>
        { (route === ('/meals') || ('/drinks')) && <Header
          history={ history }
        /> }
        { route === '/meals' ? <Meals /> : null}
        { route === '/drinks' ? <Drinks /> : null}
        { (route === ('/meals') || ('/drinks')) && <Footer /> }
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
