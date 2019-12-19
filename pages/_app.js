import React from 'react';
import App, { Container } from 'next/app';
import { getCookies } from "../helpers/utils.js";

import auth0 from '../services/auth0';

import config from '../server/config/index'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';

// Next.js utilise le composant App pour initialiser les pages.
// Ce composant est appelé à chaque appel d'un page
// au moment du rendu SSR initial côté serveur et côté client
// après l'hydratation de la page et à chaque navigation vers
// une nouvelle page ou route. 
// _app.js étend et override la class App de Next.js
// Si on veut modifier la partie html head et body qui entoure les pages
// on créera _document.js étendra et override la class Document
// _document.js entoure _app.js
export default class MyApp extends App {

  // getInitialProps est une fonction qui est exécuté côté serveur quand
  // une requête arrive au serveur et côté client seulement quand on
  // navigue vers une route différente via le composant Link ou
  // l'API de routing.
  // Elle permet d'initialiser des props avant le montage de la page.
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    // On récupère la chaîne de caractère des cookies côté client
    // si il n'y a pas de requête vers le serveur et côté
    // serveur dans le header si il y a une requête.
    // Comme ça l'application est toujours au courant si il y a
    // un cookie d'authentification présent.
    const reqCookies = getCookies(ctx.req);
    
    // On teste l'utilisateur est toujours authentifié et que sa session
    // n'a pas expirée.
    const user = await auth0.appAuth(reqCookies);

    // getInitialProps() de _app.js prend le Component page en
    // paramètre et cherche si il ya une méthode getInitialProps
    // présente, si oui elle transmet les props à la page.
    // Si la page est entouré par un HOC, penser à placer 
    // getInitialProps() au niveau du HOC.
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    // On déclare une variable isSiteOwner qui a pour valeur un booléen
    // qui est à true si le user (payload du token JWT) possède un
    // attribut user[config.NAMESPACE + '/role'] ayant pour valeur 'siteOwner'
    const isSiteOwner = user && user[config.NAMESPACE + '/role'] === 'siteOwner';

    // On crée un objet auth qui donne des information sur l'utilisateur
    // avec user sur son authentification avec isAuthenticated et
    // sur son role avec isSiteOwner
    const auth = { user, isAuthenticated: !!user, isSiteOwner };

    // On place auth dans les props de la page
    return { pageProps, auth }
  }

  render () {
    const { Component, pageProps, auth } = this.props

    return (
      <Container>
        {/*
        On transmet la props auth au composant de la page.
        */}
        <Component {...pageProps} auth={auth}/>
      </Container>
    )
  }
}