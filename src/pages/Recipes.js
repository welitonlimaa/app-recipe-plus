import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchAPIs from '../redux/actions/dataApiActions';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import Header from '../components/Header';

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
    console.log(loading);
    if (loading === true) {
      return (<h1>loading...</h1>);
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
  loading: state.dataApiReducer.isLoading,
});

export default connect(mapStateToProps)(Recipes);
