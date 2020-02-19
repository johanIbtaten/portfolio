import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import auth0Client from '../services/auth0';
import { withRouter } from 'next/router';

class Callback extends React.Component {

  async componentDidMount() {
    // Quand la page callback est montée, on appelle
    // la méthode handleAuthentication de la class Auth0
    await auth0Client.handleAuthentication();
    this.props.router.push('/');
  }

  render() {
    return (
      <BaseLayout>
        <BasePage>
          <h1> Vérification des indentifiants de connexion ... </h1>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withRouter(Callback);