import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class FavButton extends React.Component {
  addToFavorite = () => {
    const { dataRecipe, favRecipe } = this.props;
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
    favRecipe();
  };

  removeFav = () => {
    console.log('remove');
  };

  render() {
    const { isFav, datatestid } = this.props;
    return (
      <button
        type="button"
        onClick={ isFav ? this.removeFav : this.addToFavorite }
        data-testid={ datatestid }
      >
        <img
          data-testid="favorite-btn"
          src={ isFav ? blackHeartIcon : whiteHeartIcon }
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
  isFav: PropTypes.bool.isRequired,
  favRecipe: PropTypes.func.isRequired,
  datatestid: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  recipe: state.recipeReducer.recipe,
});

export default connect(mapStateToProps)(FavButton);
