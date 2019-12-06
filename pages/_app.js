import React from 'react';
import App, { Container } from 'next/app';
import { getCookies } from "../helpers/utils.js";

import auth0 from '../services/auth0';

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

    console.log(reqCookies)
    
    //const isAuthenticated = process.browser ? auth0.clientAuth() : auth0.serverAuth(reqCookies);
        
    // On teste l'utilisateur est toujours authentifié et que sa session
    // n'a pas expirée.
    const isAuthenticated = auth0.serverAuth(reqCookies);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    // On récupère le booléen qui permet de savoir si l'utilisateur
    // est toujours authentifié ou pas dans une variable auth
    const auth = { isAuthenticated };

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