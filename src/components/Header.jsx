import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';
import image from '../logo.png';

class Header extends React.Component {
  state = {
    nameUser: '',
    isValidateName: false,
  };

  componentDidMount() {
    this.handleName();
  }

  handleName = async () => {
    const test = await getUser();
    this.setState({
      nameUser: test.name,
      isValidateName: true,
    });
  };

  render() {
    const { isValidateName, nameUser } = this.state;
    return (
      <header data-testid="header-component">
        <img src={ image } alt="trybe tunes" />
        <nav className="navegacao">
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          {/* <Link to="/album/:id">Album</Link>
          <Link to="/profile/edit">Edição do perfil</Link> */}
        </nav>
        {
          isValidateName
            ? <h3 data-testid="header-user-name">{nameUser}</h3> : <Carregando />
        }
      </header>
    );
  }
}

export default Header;
