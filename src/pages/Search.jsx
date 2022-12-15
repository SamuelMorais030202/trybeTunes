import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  state = {
    name: '',
    searchUser: '',
    verification: true,
    responseAPI: false,
    API: [],
    failureAPI: false,
  };

  submitButton = async () => {
    const { searchUser } = this.state;
    const search = searchUser;
    this.setState({
      name: search,
      searchUser: '',
      verification: false,
    });
    const APIresponse = await searchAlbumsAPI(search);
    this.setState({
      verification: true,
      responseAPI: true,
      API: APIresponse,
      failureAPI: APIresponse.length === 0,
    });
  };

  handleSearch = ({ target }) => {
    this.setState({
      searchUser: target.value,
    });
  };

  render() {
    const { searchUser, verification, failureAPI, name, API, responseAPI } = this.state;
    const disabled = searchUser.length >= 2;
    console.log(responseAPI);
    const response = `Resultado de álbuns de: ${name}`;
    return (
      <div data-testid="page-search">
        <Header />
        {
          verification
            ? (
              <div>
                <input
                  value={ searchUser }
                  type="text"
                  data-testid="search-artist-input"
                  onChange={ this.handleSearch }
                />
                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ !disabled }
                  onClick={ this.submitButton }
                >
                  Pesquisar
                </button>
              </div>
            ) : <Carregando />
        }
        {
          API.length > 0 && (
            <>
              <h2>{response}</h2>
              <div>
                {
                  API.map((album) => (
                    <Link
                      to={ `/album/${album.collectionId}` }
                      key={ album.artistName }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      <div key={ album.artistName }>
                        <img src={ album.artworkUrl100 } alt="Imagem album" />
                        <h4>{album.collectionName}</h4>
                        <p>{album.artistName}</p>
                      </div>
                    </Link>
                  ))
                }
              </div>
            </>
          )
        }
        {failureAPI && responseAPI && (<h2>Nenhum álbum foi encontrado</h2>) }
      </div>
    );
  }
}

export default Search;
