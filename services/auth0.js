import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
// import jwt from 'jsonwebtoken';
// import axios from 'axios';

import { getCookieFromReq } from '../helpers/utils';

//const CLIENT_ID = process.env.CLIENT_ID;

class Auth0 {

  constructor() {
    // On initialise la connexion avec auth0 avec
    // les paramètres de notre compte auth0
    this.auth0 = new auth0.WebAuth({
      domain: 'dev-wsx0dcuw.auth0.com',
      clientID: 'jM9RnI7cuQoTkWL2fFjI5tRIfPwPhStt',
      //redirectUri: `${process.env.BASE_URL}/callback`,
      // Une fois connecté on redirige l'utilisateur vers la
      // page callback
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile'
    });

    // On bind le this des méthodes qui seront appelées
    // depuis l'extérieur 
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  handleAuthentication() {
    // On retourne une promesse
    return new Promise((resolve, reject) => {
      // On reçoit les informations de la connexion 
      // au service auth0 sous la forme de l'objet authResult ou d'un erreur
      this.auth0.parseHash((err, authResult) => {
        // Si on reçoit bien de les informations de la connexion 
        // et de l'utilisateur ()
        if (authResult && authResult.accessToken && authResult.idToken) {
          // Alors on appelle le méthode setSession qui va stocker 
          // ces informations dans un cookie
          this.setSession(authResult);
          // Comme tout s'est bien passé, on résout la promesse sans passer
          // d'argument
          resolve();
        // Si il y a une erreur lors de la connexion
        } else if (err) {
          // Alors la promesse est rejetée avec l'erreur err en argument  
          reject(err);
          // On affiche l'erreur dans la console
          console.log(err);
        }
      });
    })
  }

  setSession(authResult) {
    console.log(authResult)
    // On ajoute à la date de connexion à auth0 le temps d'expiration x 1000 
    // de l'access token définit sur auth0.com qui est de 7200 par default
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    Cookies.set('user', authResult.idTokenPayload);
    Cookies.set('jwt', authResult.idToken);
    Cookies.set('expiresAt', expiresAt);
  }

  logout() {
    // On supprime le cookie de session
    Cookies.remove('user');
    Cookies.remove('jwt');
    Cookies.remove('expiresAt');

    // On se déconnecte de auth0
    // On redirige l'utilisateur vers la page d'accueil
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: 'jM9RnI7cuQoTkWL2fFjI5tRIfPwPhStt'
    })
  }

  // isAuthenticated() {
  //   const expiresAt = Cookies.getJSON('expiresAt')
  //   return new Date().getTime() < expiresAt
  // }

  
  login() {
    // Cette méthode appelle la page de connexion via auth0
    this.auth0.authorize();
  }

  // clientAuth() {
  //   return this.isAuthenticated
  // }

  serverAuth(reqCookies) {
    if (reqCookies) {
      // On récupère le timestamp du cookie de session auhentifiée
      const expiresAt = getCookieFromReq(reqCookies, 'expiresAt'); 
      
      if (!expiresAt) {
        return undefined
      }

      // On retourne si le cookie de session auhentifiée
      // a expiré ou pas
      return new Date().getTime() < expiresAt
    }
  }    


//   async getJWKS() {
//     const res = await axios.get('https://eincode.eu.auth0.com/.well-known/jwks.json');
//     const jwks = res.data;
//     return jwks;
//   }


//   async verifyToken(token) {
//     if (token) {
//       const decodedToken = jwt.decode(token, { complete: true});

//       if (!decodedToken) { return undefined; }

//       const jwks = await this.getJWKS();
//       const jwk = jwks.keys[0];

//       // BUILD CERTIFICATE
//       let cert = jwk.x5c[0];
//       cert = cert.match(/.{1,64}/g).join('\n');
//       cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

//       if (jwk.kid === decodedToken.header.kid) {
//         try {
//           const verifiedToken = jwt.verify(token, cert);
//           const expiresAt = verifiedToken.exp * 1000;

//           return (verifiedToken && new Date().getTime() < expiresAt) ? verifiedToken : undefined;
//         } catch(err) {
//           return undefined;
//         }
//       }
//     }

//     return undefined;
//   }


//   async clientAuth() {
//     const token = Cookies.getJSON('jwt');
//     const verifiedToken = await this.verifyToken(token);

//     return verifiedToken;
//   }


//   async serverAuth(req) {
//     if (req.headers.cookie) {

//       const token = getCookieFromReq(req, 'jwt');
//       const verifiedToken = await this.verifyToken(token);

//       return verifiedToken;
//     }

//     return undefined;
//   }







}


const auth0Client = new Auth0();

export default auth0Client;
