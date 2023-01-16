import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    loading: true,
    nameUser: '',
    emailUser: '',
    descriptionUser: '',
    imageUser: '',
  };

  componentDidMount() {
    this.loadingUser();
  }

  updateTheInformations = async () => {
    const { history } = this.props;
    const { nameUser, emailUser, descriptionUser, imageUser } = this.state;
    const user = {
      name: nameUser,
      email: emailUser,
      image: imageUser,
      description: descriptionUser,
    };
    this.setState({
      loading: false,
    });
    await updateUser(user);
    this.loadingUser();
    history.push('/profile');
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  loadingUser = async () => {
    this.setState({
      loading: false,
    });
    const usersInformations = await getUser();
    this.setState({
      loading: true,
      nameUser: usersInformations.name,
      emailUser: usersInformations.email,
      descriptionUser: usersInformations.description,
      imageUser: usersInformations.image,
    });
  };

  render() {
    const {
      loading,
      nameUser,
      emailUser, descriptionUser, imageUser } = this.state;
    const num = 5;
    const habilit = [nameUser.length > num,
      descriptionUser.length > num, emailUser.length > num, imageUser.length > num];
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div>
          {
            loading
              ? (
                <div>
                  <input
                    value={ nameUser }
                    type="text"
                    data-testid="edit-input-name"
                    name="nameUser"
                    placeholder="Nome:"
                    onChange={ this.handleChange }
                  />
                  <input
                    value={ emailUser }
                    type="email"
                    name="emailUser"
                    placeholder="Email:"
                    data-testid="edit-input-email"
                    onChange={ this.handleChange }
                  />
                  <textarea
                    name="descriptionUser"
                    cols="30"
                    rows="10"
                    value={ descriptionUser }
                    data-testid="edit-input-description"
                    onChange={ this.handleChange }
                    placeholder="Descrição"
                  />
                  <input
                    value={ imageUser }
                    data-testid="edit-input-image"
                    type="text"
                    name="imageUser"
                    onChange={ this.handleChange }
                  />
                  <button
                    disabled={ !habilit.every((element) => element === true) }
                    type="button"
                    data-testid="edit-button-save"
                    onClick={ () => this.updateTheInformations() }
                  >
                    Alterar Perfil
                  </button>
                </div>
              )
              : <Carregando />
          }
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ProfileEdit;
