import React from 'react';
import BaseLayout from '../layouts/BaseLayout';
import BasePage from '../BasePage';

// On déclare un fonction fléchée qui prend en paramètre role
// qui définit le role qui peut afficher ce composant
// cette fonction retourne un autre fonction qui prend 
// en paramètre le Component comme ça cette dernière a accès 
// à la variable role tout en gardant Component comme seul paramètre
export default role => Component =>  
  class withAuth extends React.Component {

  // Permet de récupérer les props du getInitialProps() du component
  // passé en paramètre du HOC pour les retransmettre au component.
  static async getInitialProps(args) {
    const pageProps = await Component.getInitialProps && await Component.getInitialProps(args);

    return { ...pageProps };
  }

  renderProtectedPage() {
    const { isAuthenticated, user } = this.props.auth;
    
    // Si il y a un user on récupère le role contenu dans user
    // qui correspond au payload du JWT au niveau de la clé
    // `${namespace}/role`
    const userRole = user && user[`${process.env.NAMESPACE}/role`];
    
    // Par défaut l'utilisateur n'est pas autorisé.
    let isAuthorized = false;

    // Si il y a un paramètre role
    if (role) {
      // Si le role passé en paramètre correspond au role du user
      // on autorise l'affichage du composant à l'utilisateur.
      if (userRole && userRole === role) { isAuthorized = true };
    } else {
      // Si il n'y a pas de paramètre role de spécifié
      // cela veut dire que tous les utilisateurs authentifiés peuvent
      // accéder à l'affichage du composant.
      isAuthorized = true;
    }

    // Si l'utilisateur n'est pas authentifié
    if (!isAuthenticated) {
      return (
        <BaseLayout {...this.props.auth}>
          <BasePage>
            <h1> You are not authenticated. Please Login to access this page. </h1>
          </BasePage>
        </BaseLayout>
      )
    }
    // Si l'utilisateur est authentifié mais pas autorisé
    else if (!isAuthorized) {
      return (
        <BaseLayout {...this.props.auth}>
          <BasePage>
            <h1> You are not authorized. You dont have a permission to visit this page </h1>
          </BasePage>
        </BaseLayout>
      )
    }
    // Si l'utilisateur est authentifié et autorisé
    else {
      return ( <Component {...this.props} />)
    }
  }

  render() {
    return this.renderProtectedPage()
  }
}

