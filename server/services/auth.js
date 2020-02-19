const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const config = require('../config');
const NAMESPACE = config.NAMESPACE;

// MIDDLEWARES

// Récupère le JWT (token) dans le header de la requête et
// le vérifie grâce à la clé public fournie par auth0.com
// jwksRsa.expressJwtSecret will then download all signing keys 
// from the JWKS endpoint and see if a one of the signing keys 
// matches the kid in the header of the JWT. If none of the 
// signing keys match the incoming kid, an error will be thrown. 
// If we have a match, we will pass the right signing 
// key to express-jwt.
// express-jwt will the continue its own logic to validate 
// the signature of the token, the expiration, audience and the issuer.
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-wsx0dcuw.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'jM9RnI7cuQoTkWL2fFjI5tRIfPwPhStt',
  issuer: `https://dev-wsx0dcuw.auth0.com/`,
  algorithms: ['RS256']
});

const checkRole = role => (req, res, next) => {
  // On récupère les infos du user grâce au middleware précédent
  // checkJwt qui ajoute le user du token JWT dans la requête
  // avant de la passer au suivant.
  const user = req.user;

  // Si il y a un user, une valeur user[namespace + '/role']
  // qui correspond à son role stocké dans son token JWT
  // et que cette valeur est égale au role passé
  // en argument qui est le role autorisé.
  if (user && user[NAMESPACE + '/role'] && (user[NAMESPACE + '/role'] === role)) {
    // On passe avec next() à la fonction suivante dans l'appel get()
    // c'est cette dernière qui va retourner les données
    next();
  } else {
    // Sinon on retourne une erreur 401
    return res.status(401).send({title: 'Not Authorized', detail: 'You are not authorized to access this data'})
  }
}


exports.checkJwt = checkJwt;
exports.checkRole = checkRole;




