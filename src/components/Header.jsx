import React from 'react';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

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
        {
          isValidateName
            ? <h1 data-testid="header-user-name">{nameUser}</h1> : <Carregando />
        }
      </header>
    );
  }
}

export default Header;
