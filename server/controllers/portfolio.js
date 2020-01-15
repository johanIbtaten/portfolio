// On importe le modèle Portfolio
const Portfolio = require('../models/portfolio');

// On importe les utilitaires qui permette d'effacer 
// un fichier sur le serveur
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

// Récupérer tous le portfolios depuis la bdd.
exports.getPortfolios = (req, res) => {

  // On utilise la méthode find associé au modèle Portfolio
  // implémenté par la librairie mangoose.
  // {} en paramètre permet de récupérer tous les portfolios.
  Portfolio.find({})
            // Permet de trier les portfolios selon leur startDate
            // 1 représente ascendant (ordre croissant) et
            // -1 descendant (ordre décroissant)
           .sort({'startDate': -1})
           .exec((err, allPortfolios) => {

    // Si il y a une erreur, le serveur répondra avec un header
    // ayant un status 422 (Unprocessable Entity) qui veut dire
    // que la requête et que la syntaxe de la requête est correcte 
    /// mais que le serveur n'a pas été en mesure de réaliser 
    // les instructions demandées.
    if (err) {
      return res.status(422).send(err);
    }

    // Sinon on retourne dans la réponse un json avec tous les
    // objets portfolios
    return res.json(allPortfolios);
  });
}


// Récupérer un portfolio à partir de son id depuis la bdd.
exports.getPortfolioById = (req, res) => {

  // On récupère l'id du portfolio avec req.params.id
  const portfolioId = req.params.id;

  // On utilise la méthode findById de mangoose pour récupérer l'objet
  // portfolio à mettre à jour.
  Portfolio.findById(portfolioId)
            // Permet de récupérer tous les champs sauf le champ __v
           .select('-__v')
            // Execute la requête
           .exec((err, foundPortfolio) => {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json(foundPortfolio);
  });
}


// Sauvegarder un portfolio dans la bdd
exports.savePortfolio = (req, res) => {

  // On récupère l'objet portfolio à sauvegarder depuis le body
  // de la requête.
  const portfolioData = req.body;

  console.log(portfolioData);

  // Si il y a les données du user (payload du token JWT) dans 
  // la requête, on crée un userId à partir de l'attibut sub du user
  const userId = req.user && req.user.sub;

  // On crée une nouvelle instance du modèle Portfolio avec les données.
  const portfolio = new Portfolio(portfolioData);

  // On initialise son attibuts avec notre userId
  portfolio.userId = userId;

  // On sauvegarde notre portfolio dans la bdd.
  portfolio.save((err, createdPortfolio) => {
    if (err) {
      return res.status(422).send(err);
    }
    
    // Si tout se passe bien, on retourne l'objet créé dans la base
    // qui possède en plus les attibuts _id et __v générés par la bdd.
    return res.json(createdPortfolio);
  });
}

// Mettre à jour un portfolio de la bdd.
exports.updatePortfolio = async (req, res) => {
  const portfolioId = req.params.id;
  const portfolioFile = decodeURIComponent(req.params.file);

  // Seuls les attributs mis à jour peuvent être passés dans l'objet
  // portfolio qui doit permettre la mise à jour.
  const portfolioData = req.body;

  console.log('portfolioId', portfolioId); ///////////////////////////////////////
  console.log('portfolioFile', portfolioFile); ///////////////////////////////////////

  // Si le chemin de l'image n'a pas changé, on ne la supprime pas
  if (portfolioData.file !== portfolioFile) {
    // On supprime l'image associée au portfolioCard en passant son chemin
    // à la fonction unlinkAsync()
    await unlinkAsync(portfolioFile).catch(error => console.log('unlinkAsyncError', error))
  }
  

  // On récupère le portfolio de l'on souhaite mettre à jour.
  Portfolio.findById(portfolioId, (err, foundPortfolio) => {
    if (err) {
      return res.status(422).send(err);
    }

    // On le met à jour au niveau du serveur.
    foundPortfolio.set(portfolioData);

    // On le sauvegarde dans la bdd.
    foundPortfolio.save((err, savedPortfolio) => {
      if (err) {
        return res.status(422).send(err);
      }

      // On retourne l'objet mis à jour de la bdd.
      return res.json(savedPortfolio);
    });
  })
}


exports.deletePortfolio = async (req, res) => {
  const portfolioId = req.params.id;
  const portfolioFile = decodeURIComponent(req.params.file);

  console.log('portfolioId', portfolioId); ///////////////////////////////////////
  console.log('portfolioFile', portfolioFile); ///////////////////////////////////////

  // On supprime l'image associée au portfolioCard en passant son chemin
  // à la fonction unlinkAsync()
  await unlinkAsync(portfolioFile).catch(error => console.log('unlinkAsyncError', error))

  // On supprime le portfolio de la bdd ayant l'attribut 
  // _id égal au portfolioId passé en paramètre de l'url.
  Portfolio.deleteOne({_id: portfolioId}, (err, deletedPortfolio) => {
    if (err) {
      return res.status(422).send(err);
    }

    // On retourne un json confirmant la suppression.
    return res.json({status: 'DELETED'});
  })
}