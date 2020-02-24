const express = require('express');
const next = require('next');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('../routes');

var ImageRouter = require('./routes/image');

//const cors = require('cors');
const bodyParser = require('body-parser');

//const bookRoutes = require('./routes/book');
//const Book = require('./models/book');

const portfolioRoutes = require('./routes/portfolio');

const {checkJwt, checkRole} = require('./services/auth');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const config = require('./config');

var sslRedirect = require('heroku-ssl-redirect');


const robotsOptions = {
  root: path.join(__dirname, "../static"),
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8'
  }
}

// let secretData = [
//     {
//         title: 'SecretData 1',
//         description: 'Plans how to build spaceship'
//     },
//     {
//         title: 'SecretData 2',
//         description: 'My secret passwords'
//     }
// ]

// On récupère la connect string depuis l'attribut DB_URI 
// de l'objet importé config déclaré dans dev.js
mongoose.connect(config.DB_URI, { useNewUrlParser: true})
  .then(() => console.log('Database Connected!'))
  .catch(err => console.error(err));

// Version de connexion à la bdd mongo avec une fonction async
// fléchée en IIFE (Expression de fonction invoquée immédiatement)
// async () => (await mongoose.connect(config.DB_URI, { useNewUrlParser: true}))();

app.prepare()
.then(() => {
  const server = express();

  server.use(sslRedirect());

  // using bodyParser to parse JSON bodies into JS objects
  server.use(bodyParser.json());

  server.use('/uploads', express.static('uploads'));

  //server.use('/api/v1/books', bookRoutes);

  // On passe en argument les routes portfolioRoutes
  // avec comme base du enpoint /api/v1/portfolios
  server.use('/api/v1/portfolios', portfolioRoutes);

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
  // server.get('/api/v1/secret', checkJwt, (req, res) => {
  //   return res.json(secretData);
  // })

  server.get('/api/v1/onlysiteowner', checkJwt, checkRole('siteOwner'), (req, res) => {
    return res.json(secretData);
  })

  server.get('/robots.txt', (req, res) => {
    return res.status(200).sendFile('robots.txt', robotsOptions);
  });

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

  server.use('/image', ImageRouter);

  const PORT = process.env.PORT || 3000;

  server.use(handle).listen(PORT, (err) => {
    if (err) throw err
    console.log('> Ready on port ' + PORT)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})