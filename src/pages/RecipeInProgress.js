import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class RecipeInProgress extends React.Component {
  state = {
    type: '',
    route: '',
    id: '',
  };

  componentDidMount() {
    const { history } = this.props;
    const { pathname } = history.location;
    const id = pathname.split('s/');
    this.setState({ type: id[0], route: pathname, id: id[1] });
  }

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
    const { route, id } = this.state;
    console.log(route, id);
    const dataRecipe = this.variablePattern();

    return (<h1>{dataRecipe.title}</h1>);
  }
}

RecipeInProgress.propTypes = {
//   dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  recipe: state.recipeReducer.recipe,
  loading: state.allRecipesReducer.isLoading,
});

export default connect(mapStateToProps)(RecipeInProgress);
