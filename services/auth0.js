import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import { getCookieFromReq } from '../helpers/utils';

const CLIENT_ID = process.env.CLIENT_ID;

class Auth0 {

  constructor() {
    // On initialise la connexion avec auth0 avec
    // les paramètres de notre compte auth0
    this.auth0 = new auth0.WebAuth({
      domain: 'dev-wsx0dcuw.auth0.com',
      clientID: CLIENT_ID,
      // Une fois connecté on redirige l'utilisateur vers la
      // page callback
      redirectUri: `${process.env.BASE_URL}/callback`,
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
    // On ajoute à la date de connexion à auth0 le temps d'expiration en ms x 1000 
    // (pour le transformer en secondes) de l'access token définit sur auth0.com 
    // qui est de 7200s par default
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    Cookies.set('jwt', authResult.idToken);
  }
  
  login() {
    // Cette méthode appelle la page de connexion via auth0
    this.auth0.authorize();
  }
  
  logout() {
    // On supprime le cookie de session
    Cookies.remove('jwt');
    
    // On se déconnecte de auth0
    // On redirige l'utilisateur vers la page d'accueil
    this.auth0.logout({
      returnTo: process.env.BASE_URL,
      clientID: CLIENT_ID
    })
  }
  
  async appAuth(reqCookies) {
    if (reqCookies) {
      // On récupère le token de session
      const token = getCookieFromReq(reqCookies, 'jwt');
      const verifiedToken = await this.verifyToken(token);

      return verifiedToken;
    }

    return undefined;
  }

  async getJWKS() {
    // Récupère l'objet JWKS depuis le end point fourni par auth0.com
    // Cette objet permet de fournir le kid et le x5c qui est
    // le certificat ou clé public qui permet de vérifier
    // l'authenticité de la signature du JWT par auth0.com
    // qui lui seul possède la clé privé qui a encodé la signature
    // du JWT
    const res = await axios.get('https://dev-wsx0dcuw.auth0.com/.well-known/jwks.json');
    const jwks = res.data;
    return jwks;
  }
  // Format du JWKS
  // {
  //     "keys": [
  //         {
  //             "alg": "RS256",
  //             "kty": "RSA",
  //             "use": "sig",
  //             "n": "2KnHG7L9HuQ831zwfBbJr_VADBXZRHweiQbw68mZxxWi0UdxVpN5lyZIZPo4VzxcaZf0z4L50w11RLFuD0FMi4DifZbrdCYtzHqtDEwJHPlyfITAXmkige7eUbabIFAicJw4gd--DrDnbwrjUEb3sM_P2TqwGAURRkmapqEjgj8SXi8vS9E-XslyPWP-THgp5uTR5ZqD9RIs28aYfdxF8FcaLhEaCuzry0MUdityIAaludJmbgI90k_ot73QasugG8Ik8xwCmvUQvZy9jRpRd1CBj_cw1h5zxCKICtYo8rSz76uusaqb3Mo3xCh7taZO_hQrMYz-VkUokHQRiReZXQ",
  //             "e": "AQAB",
  //             "kid": "QTVBMTFBQzU1MDVEMUJGMkExMUZEQUFGQTVBQUVCM0VGNTZGQUIwQg",
  //             "x5t": "QTVBMTFBQzU1MDVEMUJGMkExMUZEQUFGQTVBQUVCM0VGNTZGQUIwQg",
  //             "x5c": [
  //                 "MIIDBzCCAe+gAwIBAgIJCFpR0Bc6FGHPMA0GCSqGSIb3DQEBCwUAMCExHzAdBgNVBAMTFmRldi13c3gwZGN1dy5hdXRoMC5jb20wHhcNMTkxMjA0MTQzODAyWhcNMzMwODEyMTQzODAyWjAhMR8wHQYDVQQDExZkZXYtd3N4MGRjdXcuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2KnHG7L9HuQ831zwfBbJr/VADBXZRHweiQbw68mZxxWi0UdxVpN5lyZIZPo4VzxcaZf0z4L50w11RLFuD0FMi4DifZbrdCYtzHqtDEwJHPlyfITAXmkige7eUbabIFAicJw4gd++DrDnbwrjUEb3sM/P2TqwGAURRkmapqEjgj8SXi8vS9E+XslyPWP+THgp5uTR5ZqD9RIs28aYfdxF8FcaLhEaCuzry0MUdityIAaludJmbgI90k/ot73QasugG8Ik8xwCmvUQvZy9jRpRd1CBj/cw1h5zxCKICtYo8rSz76uusaqb3Mo3xCh7taZO/hQrMYz+VkUokHQRiReZXQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBT2TLAu7jY95lVxT21aij2AEuBRmzAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBACDTB2e5CpeiwElUghhVgpX8gK7PaWpFK/nE3ZZSEyjxRb12l2ZGK3KskASANa+cFNhGGQD/KUOXRrME3Y3OORYsds5goJw9CXLTjUiDpGfbemZ5oagU7GMN1XahDT4k/R1QkwOZPLciihcsJIrmzDHWymb/u/+YEfQ1OtOl7Hp3V/Y09d35/ZR65ErjQgJQ+fbSjSsXXxrQAR/XpKCc6WmaYf++Cw+NMBo+Jf01LOlRhhVHn0F/tx99+yPuZ2F/T5icTzXXfUoqY1FXlTrIpFdUmc602+mu7kV0XduU56Njc9wiQY2ynqKGQlnA19L+6waatbaAkfB4SVPKsv4JosE="
  //             ]
  //         }
  //     ]
  // }


  async verifyToken(token) {
    if (token) {
      // On décode notre jwt stocké côté client dans un cookie
      const decodedToken = jwt.decode(token, { complete: true});

      if (!decodedToken) { return undefined; }

      // On récupère l'objet JWKS (Json Web Keys Set)
      const jwks = await this.getJWKS();
      const jwk = jwks.keys[0];

      // BUILD CERTIFICATE ou clé public à partir du JWKS
      let cert = jwk.x5c[0];
      cert = cert.match(/.{1,64}/g).join('\n');
      cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
      // On fait une première vérification en comparant les kid
      // de la partie header de notre JWT et du JWKS
      if (jwk.kid === decodedToken.header.kid) {
        try {
          // On vérifie la signature de notre JWT (token)
          // grâce au certificat (clé public) et la librairie jwt
          // (Synchronous) If a callback is not supplied, function acts
          // synchronously. Returns the payload decoded if the signature 
          // is valid and optional expiration, audience, 
          // or issuer are valid. If not, it will throw the error.
          const verifiedToken = jwt.verify(token, cert);
          const expiresAt = verifiedToken.exp * 1000;

          return (verifiedToken && new Date().getTime() < expiresAt) ? verifiedToken : undefined;
        } catch(err) {
          return undefined;
        }
      }
    }

    return undefined;
  }
  // Sortie de verifiedToken (payload du JWT vérifié)  
  // {
  //   at_hash: "ki16R7yTPnbVtwqW7VmRcg"
  //   aud: "jM9RnI7cuQoTkWL2fFjI5tRIfPwPhStt"
  //   exp: 1576009219
  //   family_name: "Nash"
  //   given_name: "Joé"
  //   iat: 1575973219
  //   iss: "https://dev-wsx0dcuw.auth0.com/"
  //   locale: "fr"
  //   name: "Joé Nash"
  //   nickname: "j.ibtaten"
  //   nonce: "r57XADuKFxODlS24RPeV9DyngtR.3X_c"
  //   picture: "https://lh5.googleusercontent.com/-wCqrU2LOPp8/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfdfe0BExv6VTGfvihpjIIgzo3lig/photo.jpg"
  //   sub: "google-oauth2|110516752539915891476"
  //   updated_at: "2019-12-10T10:20:19.706Z"
  // }
}


const auth0Client = new Auth0();

export default auth0Client;
