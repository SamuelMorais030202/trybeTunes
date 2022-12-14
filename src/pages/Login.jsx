import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  // Declaração dos estados
  state = {
    nameInput: '',
    isSaveInformation: false,
  };

  // Função vai adiocionar o conteúdo do input no estado
  handleName = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async () => {
    const { nameInput } = this.state;
    const { history } = this.props;
    const user = {
      name: nameInput,
    };
    this.setState({ isSaveInformation: true });
    await createUser(user);
    history.push('/search');
  };

  render() {
    const { nameInput, isSaveInformation } = this.state;
    const validate = nameInput.length > 2;

    return (
      <div data-testid="page-login">
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="nameInput"
            value={ nameInput }
            data-testid="login-name-input"
            onChange={ this.handleName }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ !validate }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </label>
        {isSaveInformation && <Carregando />}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Login;
