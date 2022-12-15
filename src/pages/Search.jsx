import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    searchUser: '',
  };

  handleSearch = ({ target }) => {
    this.setState({
      searchUser: target.value,
    });
  };

  render() {
    const { searchUser } = this.state;
    const disabled = searchUser.length >= 2;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleSearch }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ !disabled }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
