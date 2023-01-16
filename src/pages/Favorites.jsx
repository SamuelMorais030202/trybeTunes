import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
// import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    loading: true,
    musicsFavorits: [],
    check: true,
  };

  componentDidMount() {
    this.loadingFavoritsSongs();
  }

  disfavoringMusic = async (music) => {
    this.setState({
      loading: true,
    });
    await removeSong(music);
    this.setState({
      musicsFavorits: await getFavoriteSongs(),
      loading: false,
    });
    // await getFavoriteSongs();
  };

  loadingFavoritsSongs = async () => {
    const musics = await getFavoriteSongs();
    this.setState({
      loading: false,
      musicsFavorits: musics,
    });
  };

  render() {
    const { loading, musicsFavorits, check } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h3>Favoritas:</h3>
        <div>
          {
            loading
              ? <Carregando />
              : (
                musicsFavorits.map((music) => (
                  <div key={ music.trackName }>
                    <h5>{ music.trackName }</h5>
                    <audio
                      src={ music.previewUrl }
                      data-testid="audio-component"
                      controls
                    >
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      <code>audio</code>
                    </audio>
                    <label
                      htmlFor={ `checkbox-music-${music.trackId}` }
                      data-testid={ `checkbox-music-${music.trackId}` }
                    >
                      <input
                        id={ `checkbox-music-${music.trackId}` }
                        type="checkbox"
                        checked={ check }
                        name="checked"
                        onChange={ () => this.disfavoringMusic(music) }
                      />
                      Favorita
                    </label>
                  </div>
                ))
              )
          }
        </div>
      </div>
    );
  }
}

export default Favorites;
