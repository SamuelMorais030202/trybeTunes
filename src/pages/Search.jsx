import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
          />
          <button
            type="button"
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
