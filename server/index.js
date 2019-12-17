const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const routes = require('../routes');

const cors = require('cors');
const bodyParser = require('body-parser');

const {checkJwt, checkRole} = require('./services/auth');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const config = require('./config');

const Book = require('./models/book');

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

  // using bodyParser to parse JSON bodies into JS objects
  server.use(bodyParser.json());

  //server.use('/api/v1/books', bookRoutes);
  server.post('/api/v1/books', (req, res) => {
    const bookData = req.body;
    const book = new Book(bookData);

    book.save((err, createdBook) => {
      if (err) {
        return res.status(422).send(err);
      }

      return res.json(createdBook);
    });
  })

  server.get('/api/v1/books', (req, res) => {
    Book.find({}, (err, allBooks) => {
      if (err) {
        return res.status(422).send(err);
      }  
      return res.json(allBooks);
    })
  })

  server.patch('/api/v1/books/:id', (req, res) => {
    const bookId = req.params.id;
    const bookData = req.body;

    Book.findById(bookId, (err, foundBook) => {
      if (err) {
        return res.status(422).send(err);
      }

      foundBook.set(bookData);
      foundBook.save((err, savedBook) => {
        if (err) {
          return res.status(422).send(err);
        }

        return res.json(foundBook);
      });
    })
  })

  server.delete('/api/v1/books/:id', (req, res) => {
    const bookId = req.params.id;

    Book.deleteOne({_id: bookId}, (err, deletedBook) => {
      if (err) {
        return res.status(422).send(err);
      }

      return res.json({status: 'DELETED'});
    })
  })

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
  server.get('/api/v1/secret', checkJwt, (req, res) => {
    return res.json(secretData);
  })

  server.get('/api/v1/onlysiteowner', checkJwt, checkRole('siteOwner'), (req, res) => {
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