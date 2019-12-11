const express = require('express');
const next = require('next');
const routes = require('../routes');

const cors = require('cors');
const bodyParser = require('body-parser');

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
  //server.use(cors());

  server.get('/portfolio/:id', (req, res) => {
    app.render(req, res, '/portfolio', {id: req.params.id})
  })

  // Quand on se rend sur ce end point du serveur, 
  // il nous retourne un object JSON dans la réponse
  // du tableau d'objets secretData
  // authService.checkJWT est un middleware appelé avant la fonction
  // qui renvoie la réponse.
  // server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
  server.get('/api/v1/secret', authService.checkJwt, (req, res) => {
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