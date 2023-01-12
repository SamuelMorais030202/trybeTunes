import React from 'react';
import PropTypes from 'prop-types';
import Carregando from '../pages/Carregando';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  // Estados
  state = {
    check: true,
    // updateMusic: [],
  };

  // Essa função ira adicionar as músicas favoritadas
  // A lógica do carregando esta aqui
  favoriteMusic = async (music) => {
    const { update } = this.props;
    // const { updateMusic } = this.state;
    this.setState({
      check: false,
    });
    // Irá adicionar a música aos favoritos
    await addSong(music);
    // Irá atualizar a lista de músicas favoritadas
    await update();
    this.setState({
      check: true,
    });
  };

  render() {
    const { trackName, previewUrl, trackId, updateChecked } = this.props;
    const { check } = this.state;
    return (
      <div>
        <h5>{trackName}</h5>
        <audio
          src={ previewUrl }
          data-testid="audio-component"
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        {
          check
            ? (
              <label
                htmlFor={ `checkbox-music-${trackId}` }
                data-testid={ `checkbox-music-${trackId}` }
              >
                <input
                  type="checkbox"
                  checked={ updateChecked.some((update) => update
                    .trackId === trackId) }
                  name="checked"
                  id={ `checkbox-music-${trackId}` }
                  onChange={ () => this.favoriteMusic(this.props) }
                />
              </label>
            )
            : (<Carregando />)
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  // check: PropTypes.bool.isRequired,
  // addSong: PropTypes.shape().isRequired,
  update: PropTypes.func.isRequired,
  updateChecked: PropTypes.bool.isRequired,
};

export default MusicCard;
