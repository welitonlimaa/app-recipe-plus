import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecipeById, fetchSuggest } from '../redux/actions/actions';
import Loading from '../components/Loading';

class RecipeDetails extends React.Component {
  state = {
    type: '',
  };

  componentDidMount() {
    const { dispatch, history } = this.props;
    const { pathname } = history.location;
    const id = pathname.split('s/');
    dispatch(fetchRecipeById(id[1], id[0]));
    dispatch(fetchSuggest());

    this.setState({ type: id[0] });
  }

  // parametriza os nomes das variáveis de acordo o tipo se drink ou meal
  variablePattern = () => {
    const { type } = this.state;
    const { recipe } = this.props;
    let data = {};
    if (type.includes('drink')) {
      const { strDrink: title } = recipe;
      data = { title };
    } else {
      const { strMeal: title } = recipe;
      data = { title };
    }
    return data;
  };

  render() {
    const { loading } = this.props;
    if (loading) {
      return <Loading />;
    }

    const dataRecipe = this.variablePattern();
    console.log(dataRecipe);

    return (<h1>{dataRecipe.title}</h1>);
  }
}

RecipeDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  recipe: state.recipeReducer.recipe,
  loading: state.allRecipesReducer.isLoading,
});

export default connect(mapStateToProps)(RecipeDetails);
