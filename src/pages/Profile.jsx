import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Profile extends React.Component {
  state = {
    loading: true,
    informationsUser: {},
  };

  componentDidMount() {
    this.retrievingUserInformations();
  }

  retrievingUserInformations = async () => {
    this.setState({
      loading: false,
    });
    const informations = await getUser();
    this.setState({
      loading: true,
      informationsUser: informations,
    });
    console.log(informations);
  };

  render() {
    const { loading, informationsUser } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div>
          {
            loading
              ? (
                <div>
                  <img
                    src={ informationsUser.image }
                    alt={ informationsUser.name }
                    data-testid="profile-image"
                  />
                  <Link to="/profile/edit">Editar perfil</Link>
                  <h3>
                    Nome:
                  </h3>
                  <p>{informationsUser.name}</p>
                  <h3>
                    Email:
                  </h3>
                  <p>{ informationsUser.email }</p>
                  <h3>Descrição:</h3>
                  <p>{ informationsUser.description }</p>
                </div>
              ) : <Carregando />
          }
        </div>
      </div>
    );
  }
}

export default Profile;
