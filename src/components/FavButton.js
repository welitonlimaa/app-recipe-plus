import PropTypes from 'prop-types';
import React from 'react';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import whiteHeartIcon from '../style/images/like.png';

class FavButton extends React.Component {
  addToFavorite = () => {
    const { dataRecipe } = this.props;
    const { id,
      type,
      category,
      name,
      alcoholicOrNot,
      image,
      nationality } = dataRecipe;

    const obj = {
      id,
      type,
      nationality,
      name,
      category,
      image,
      alcoholicOrNot,
    };
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, obj]));
  };

  render() {
    return (
      <button
        type="button"
        onClick={ this.addToFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          alt="favortitar"
        />
      </button>
    );
  }
}

FavButton.propTypes = {
  dataRecipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    nationality: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  recipe: state.recipeReducer.recipe,
});

export default connect(mapStateToProps)(FavButton);
