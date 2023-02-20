import React from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

class ShareButton extends React.Component {
  state = {
    copy: false,
  };

  copylink = () => {
    const { type, idRecipe } = this.props;
    console.log(idRecipe);
    const { origin } = window.location;
    const url = `${origin}/${type}/${idRecipe}`;
    clipboardCopy(url);
    this.setState({ copy: true });
  };

  render() {
    const { datatestid } = this.props;
    const { copy } = this.state;
    return (
      <div>
        { copy ? <span>Link copied!</span> : ''}
        <button
          type="button"
          onClick={ this.copylink }
        >
          <img
            data-testid={ datatestid }
            src={ shareIcon }
            alt="compartilhar"
          />
        </button>
      </div>
    );
  }
}

ShareButton.propTypes = {
  datatestid: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  idRecipe: PropTypes.string.isRequired,
};

export default ShareButton;
