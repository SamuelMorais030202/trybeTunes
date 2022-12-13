import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              data-testid="login-name-input"
              onChange={ this.handleName }
            />
            <button
              type="button"
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Login;
