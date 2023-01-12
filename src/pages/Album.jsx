import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  // Declaração dos estados
  state = {
    artist: '',
    idAlbum: [],
    updateMusic: [],
  };

  // função nativa
  componentDidMount() {
    this.loadingMusics();
    this.updatMusic();
  }

  updatMusic = async () => {
    const checkMusic = await getFavoriteSongs();
    this.setState({
      updateMusic: checkMusic,
    });
  };

  // Vai desetruturar o id que é passado pela url
  // O id desestruturado será passado como argumento para a
  // Função getMusics que chama a API de músicas
  loadingMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const listMusics = await getMusics(id);
    this.setState({
      artist: listMusics[0],
      idAlbum: listMusics.filter((music) => music.trackId),
    });
  };

  render() {
    // Desestruturação dos estados
    const { idAlbum, artist, updateMusic } = this.state;
    return (
      // Div principal
      <div data-testid="page-album">
        <Header />
        <div>
          <div>
            <img src={ artist.artworkUrl100 } alt="" />
            <h4
              data-testid="album-name"
            >
              {artist.collectionName}
            </h4>
            <p
              data-testid="artist-name"
            >
              {artist.artistName}
            </p>
          </div>
          <div>
            {idAlbum.map((music) => (
              <MusicCard
                update={ this.updatMusic }
                updateChecked={ updateMusic }
                { ...music }
                key={ music.trackName }
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default Album;
