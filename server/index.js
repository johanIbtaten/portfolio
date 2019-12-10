const express = require('express');
const next = require('next');
const routes = require('../routes');

const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const authService = require('./services/auth');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);

let secretData = [
    {
        title: 'SecretData 1',
        description: 'Plans how to build spaceship'
    },
    {
        title: 'SecretData 2',
        description: 'My secret passwords'
    }
]
  

app.prepare()
.then(() => {
  const server = express();

  // using bodyParser to parse JSON bodies into JS objects
  server.use(bodyParser.json());

  // enabling CORS for all requests
  server.use(cors());

  server.get('/portfolio/:id', (req, res) => {
    app.render(req, res, '/portfolio', {id: req.params.id})
  })

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
  const checkJwt = jwt({
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

  // Quand on se rend sur ce end point du serveur, 
  // il nous retourne un object JSON dans la réponse
  // du tableau d'objets secretData
  // authService.checkJWT est un middleware appelé avant la fonction
  // qui renvoie la réponse.
  // server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
  server.get('/api/v1/secret', checkJwt, (req, res) => {
      console.log(req)
    return res.json(secretData);
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  // On gére l'erreur UnauthorizedError en renvoyant un header 401
  // avec un message
  server.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({title: 'Unauthorized', detail: 'Unauthorized Access JOJO!'});
    }
  });

  server.use(handle).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})