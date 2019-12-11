import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import withAuth from '../components/hoc/withAuth';

class Owner extends React.Component {

  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1> I am Owner Page </h1>
        </BasePage>
      </BaseLayout>
    )
  }
}

// On passe en paramètre de withAuth le role de l'utilisateur authentifié
// qui peut accéder à ce composant
export default withAuth('siteOwner')(Owner);
