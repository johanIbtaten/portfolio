const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// MIDDLEWARE
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
  exports.checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://dev-wsx0dcuw.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    //audience: 'https://dev-wsx0dcuw.auth0.com/api/v2/',
    audience: 'jM9RnI7cuQoTkWL2fFjI5tRIfPwPhStt',
    issuer: `https://dev-wsx0dcuw.auth0.com/`,
    algorithms: ['RS256']
  });

// exports.checkRole = role => (req, res, next) => {
//   const user = req.user;

//   if (user && user[NAMESPACE + '/role'] && (user[NAMESPACE + '/role'] === role)) {
//     next();
//   } else {
//     return res.status(401).send({title: 'Not Authorized', detail: 'You are not authorized to access this data'})
//   }
// }




