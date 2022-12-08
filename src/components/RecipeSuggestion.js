import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import RecipeMealCard from './RecipeMealCard';
import '../style/recipeSuggestion.css';

class RecipeSuggestion extends Component {
  state = {
    suggestionArray: [],
  };

  componentDidMount() {
    this.setState({ suggestionArray: this.saveSuggestionArray() });
  }

  saveSuggestionArray = () => {
    const { suggestionArray } = this.props;
    const maxSuggestion = 6;
    const randomInt = Math.random() * (suggestionArray.length - maxSuggestion);
    const randomArray = suggestionArray
      .filter((recipe, index) => (index > randomInt))
      .filter((recipe, index) => (index < maxSuggestion));
    console.log(randomInt);
    console.log(randomArray);
    return randomArray;
  };

  render() {
    const { suggestionArray } = this.state;
    return (
      <>
        <span>Sugestão de receitas</span>
        <div className="carrousel">
          {suggestionArray.map((recipe) => (
            <RecipeMealCard
              dataMeal={ recipe }
              id={ recipe.idMeal }
              key={ recipe.idMeal }
              className="content-recipe"
            />
          ))}
        </div>
      </>
    );
  }
}

RecipeSuggestion.propTypes = {
  suggestionArray: PropTypes.arrayOf().isRequired,
};
const mapStateToProps = ({ recipeReducer }) => ({
  suggestionArray: recipeReducer.mealsSuggest,
});

export default connect(mapStateToProps)(RecipeSuggestion);
